# Use an official Python runtime as a parent image
FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app/
COPY . /app/

# Copy entrypoint.sh into the container
COPY ./entrypoint.sh /app/entrypoint.sh

# Give execute permission to entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 8000

# Run entrypoint.sh to perform tasks before starting the application
ENTRYPOINT ["/app/entrypoint.sh"]