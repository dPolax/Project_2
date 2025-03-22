from flask import render_template
from flask_login import current_user
from app.main import bp
from app.auth.forms import LoginForm, RegisterForm

@bp.route('/')
@bp.route('/index')
def index():
    # Инициализация форм для модальных окон
    login_form = LoginForm()
    register_form = RegisterForm()
    return render_template('index.html', 
                          login_form=login_form, 
                          register_form=register_form, 
                          current_user=current_user)