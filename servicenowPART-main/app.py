import streamlit as st
from service_now_connector import ServiceNowConnector
from llm_engine import LLMEngine
from knowledge_base import KnowledgeBase
from dotenv import load_dotenv
import os

load_dotenv()


instance_url = os.getenv("SERVICENOW_INSTANCE_URL")
username = os.getenv("SERVICENOW_USERNAME")
password = os.getenv("SERVICENOW_PASSWORD")


connector = ServiceNowConnector()
llm_engine = LLMEngine()
knowledge_base = KnowledgeBase()


st.title("ServiceNow Ticket Management")


tickets = connector.fetch_tickets()
st.session_state.tickets = tickets


filter_category = st.selectbox("Filter by Category", ["All", "Hardware", "Software", "Inquiry", "Network", "Database"])
filter_active = st.selectbox("Filter by Active Status", ["All", "Active", "Closed"])


if st.button("Fetch Tickets Based on Filters"):
    filtered_tickets = st.session_state.tickets
    if filter_category != "All":
        filtered_tickets = [ticket for ticket in filtered_tickets if ticket["category"].lower() == filter_category.lower()]
    if filter_active != "All":
        active_status = "true" if filter_active == "Active" else "false"
        filtered_tickets = [ticket for ticket in filtered_tickets if ticket["active"] == active_status]

    if filtered_tickets:
        for ticket in filtered_tickets:
            st.write(f"Ticket ID: {ticket['sys_id']}")
            st.write(f"Full Description: {ticket['description']}")
    else:
        st.write("No tickets found based on the selected filters.")


ticket_text = st.text_area("Enter Ticket Description:")

if st.button("Classify and Respond"):
    if ticket_text:
        
        response = llm_engine.generate_response(ticket_text)
        st.write(f"AI Response: {response}")

        
        ticket_embedding = llm_engine.generate_embedding(ticket_text)
        response_embedding = llm_engine.generate_embedding(response)

        
        knowledge_base.store_knowledge(ticket_text, ticket_embedding)
        knowledge_base.store_knowledge(response, response_embedding)

    else:
        st.warning("Please enter a ticket description to classify and respond.")


if "response_history" not in st.session_state:
    st.session_state.response_history = []

if ticket_text and st.button("Send Follow-up Response"):
    
    st.session_state.response_history.append(ticket_text)

    
    follow_up_response = llm_engine.generate_response(ticket_text)
    st.write(f"Follow-up Response: {follow_up_response}")

    
    follow_up_response_embedding = llm_engine.generate_embedding(follow_up_response)

    
    knowledge_base.store_knowledge(follow_up_response, follow_up_response_embedding)
