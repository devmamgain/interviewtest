from flask import Flask, request, jsonify
from flask_cors import CORS

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama

app = Flask(__name__)
CORS(app)

print("Loading PDF...")

# Load PDF
loader = PyPDFLoader("sample.pdf")
docs = loader.load()

# Split PDF into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_documents(docs)

print("Creating embeddings...")

# Create embeddings
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
)

# Store embeddings in Chroma DB
vector_db = Chroma.from_documents(chunks, embeddings)

# Better retriever
retriever = vector_db.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 2}
)

print("Loading Ollama model...")

# Load local LLM
llm = Ollama(model="mistral")

print("AI Service Ready!")

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.get_json()

        question = data.get("question", "").strip()

        if not question:
            return jsonify({
                "answer": "Question is required"
            }), 400

        print("\n========================")
        print("QUESTION:", question)

        # Retrieve relevant chunks
        docs = retriever.invoke(question)

        # Debug retrieved chunks
        for i, doc in enumerate(docs):
            print(f"\nCHUNK {i+1}:\n")
            print(doc.page_content)

        # Create context
        context = "\n\n".join([doc.page_content for doc in docs])

        # Strict prompt
        prompt = f"""
You are a Hindi PDF question answering assistant.


IMPORTANT LANGUAGE RULE:
- You must reply ONLY in Hindi.
- Never reply in English.
- Never mix Hindi and English.


Strict Rules:
1. Answer ONLY from the provided PDF context.
2. If the answer is not clearly present in the PDF context, reply exactly:
   "PDF में इस सवाल से जुड़ी जानकारी नहीं मिली।"
3. Do NOT use your own knowledge.
4. Do NOT guess.
5. Do NOT add extra explanations.
6. Keep answers short and precise.
7. Output only the final Hindi answer.

PDF Context:
{context}

Question:
{question}

Final Hindi Answer:
"""

        # Generate answer
        answer = llm.invoke(prompt).strip()

        # Cleanup unwanted prefixes
        answer = answer.replace("Answer:", "")
        answer = answer.replace("उत्तर:", "")
        answer = answer.replace("Final Hindi Answer:", "")
        answer = answer.strip()

        # Fallback
        if not answer:
            answer = "PDF में इस सवाल से जुड़ी जानकारी नहीं मिली।"

        return jsonify({
            "answer": answer
        })

    except Exception as e:
        print("ERROR:", str(e))

        return jsonify({
            "answer": "Server error",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)