from flask import redirect, url_for, request
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user
from app.models.user import User

class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin
        
    def inaccessible_callback(self, name, **kwargs):
        # Перенаправление на страницу входа, если нет доступа
        return redirect(url_for('auth.login', next=request.url))

class UserAdmin(SecureModelView):
    column_list = ('id', 'username', 'email', 'is_admin', 'created_at')
    column_searchable_list = ('username', 'email')
    column_filters = ('is_admin',)
    form_columns = ('username', 'email', 'is_admin')
    
    def on_model_change(self, form, model, is_created):
        # Сохраняем пароль только при создании новой записи
        if is_created:
            model.set_password('default_password')  # Временный пароль для новых пользователей

def configure_admin(admin, db):
    # Добавляем административные представления
    admin.add_view(UserAdmin(User, db.session, name='Пользователи'))