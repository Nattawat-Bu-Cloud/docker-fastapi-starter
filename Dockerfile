## Create your dockerfile here...
FROM python:3.10-slim
WORKDIR /app
copy requirements.txt .
run pip install --no-cache-dir -r requirements.txt
copy app/ ./app
EXPOSE 8000
CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000" ]