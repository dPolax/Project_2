from app import create_app, db
from app.models.user import User

app = create_app()

# Добавление тестового администратора при первом запуске
@app.before_first_request
def create_admin():
    if User.query.filter_by(is_admin=True).first() is None:
        admin = User(
            username='admin',
            email='admin@example.com',
            is_admin=True
        )
        admin.set_password('admin_password')
        db.session.add(admin)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)