from transformers import GPT2LMHeadModel, GPT2Tokenizer,pipeline
from sentence_transformers import SentenceTransformer
import torch

class LLMEngine:
    def __init__(self, model_name="gpt2"):
        """
        Initialize the LLM Engine with the GPT-2 model.
        """
        
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        
        
        self.encoder = SentenceTransformer('all-MiniLM-L6-v2')

        
        self.generator = pipeline('text-generation', model=self.model, tokenizer=self.tokenizer)
    
    def generate_response(self, prompt, max_length=150):
        """
        Generate a response for the given prompt using GPT-2.
        
        :param prompt: The input text (ticket description) to generate a response for.
        :param max_length: The maximum length of the generated text.
        :return: Generated text as a response to the input prompt.
        """
        response = self.generator(
            prompt,
            max_length=max_length,
            num_return_sequences=1,  
            no_repeat_ngram_size=2,  
            top_k=50,               
            top_p=0.95,               
            temperature=0.7          
        )
        
        return response[0]['generated_text']
    
    def generate_embedding(self, text):
        """
        Generate embeddings for a given text using a transformer model (Sentence-BERT).
        
        :param text: The input text (ticket description or response) to generate embeddings for.
        :return: The embedding for the input text.
        """
        
        embedding = self.encoder.encode(text).tolist()  
        return embedding
