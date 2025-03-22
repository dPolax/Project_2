import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Основные настройки
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    DEBUG = os.environ.get('DEBUG') or False
    
    # Настройки базы данных PostgreSQL
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://postgres:password@localhost/flask_app'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Настройки Flask-Admin
    FLASK_ADMIN_SWATCH = 'cerulean'