import psycopg2
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import pgvector

load_dotenv()

class KnowledgeBase:
    def __init__(self):
        self.dbname = os.getenv("DB_NAME")
        self.user = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.host = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")

        
        self.conn = psycopg2.connect(
            dbname=self.dbname, 
            user=self.user, 
            password=self.password, 
            host=self.host, 
            port=self.port
        )
        self.cursor = self.conn.cursor()

        
        self.cursor.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        self.conn.commit()

        
        self.encoder = SentenceTransformer('all-MiniLM-L6-v2')

        
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS knowledge_base (
                id SERIAL PRIMARY KEY,
                text TEXT,
                embedding vector(384)  -- Adjusted size for your model's embedding (384)
            );
        """)
        self.conn.commit()

    def store_knowledge(self, text, embedding):
        """
        Store text and its corresponding embedding in the knowledge base.
        
        :param text: The text (ticket description or response).
        :param embedding: The corresponding embedding for the text.
        """
        self.cursor.execute("""
            INSERT INTO knowledge_base (text, embedding)
            VALUES (%s, %s);
        """, (text, embedding))
        self.conn.commit()

    def search_knowledge(self, query):
        """
        Search for the most similar text in the knowledge base using a query.
        
        :param query: The search query text.
        :return: A list of the closest matching text entries in the knowledge base.
        """
        query_embedding = self.encoder.encode(query).tolist()

        self.cursor.execute("""
            SELECT id, text, embedding <=> %s AS distance
            FROM knowledge_base
            ORDER BY distance
            LIMIT 5;
        """, (query_embedding,))

        results = self.cursor.fetchall()
        return [{"id": res[0], "text": res[1], "distance": res[2]} for res in results]
    
    def close(self):
        """
        Close the database connection.
        """
        self.cursor.close()
        self.conn.close()
