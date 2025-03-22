from flask import render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from app import db
from app.models.user import User
from app.auth import bp
from app.auth.forms import LoginForm, RegisterForm

@bp.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return jsonify({'success': True, 'redirect': url_for('main.index')})
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            return jsonify({'success': False, 'message': 'Неверный email или пароль'})
        
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or not next_page.startswith('/'):
            next_page = url_for('main.index')
        return jsonify({'success': True, 'redirect': next_page})
    
    return jsonify({'success': False, 'errors': form.errors})

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@bp.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return jsonify({'success': True, 'redirect': url_for('main.index')})
    
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        
        # Автоматически логиним после регистрации
        login_user(user)
        return jsonify({'success': True, 'redirect': url_for('main.index')})
    
    return jsonify({'success': False, 'errors': form.errors})

@bp.route('/get-forms')
def get_forms():
    """Возвращает формы входа и регистрации для модальных окон"""
    login_form = LoginForm()
    register_form = RegisterForm()
    return jsonify({
        'login_form': render_template('auth/login_modal.html', form=login_form),
        'register_form': render_template('auth/register_modal.html', form=register_form)
    })