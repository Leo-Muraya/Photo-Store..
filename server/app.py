from flask import Flask, request, jsonify, make_response, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from server.models import db, User, Photo, Like 
from flask_migrate import Migrate
from dotenv import load_dotenv
import os


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

...

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

load_dotenv()

CORS(app)

# Set maximum content length for incoming requests to 16 MB
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'vsgewvwesvsgevafdsag'
app.config['JWT_SECRET_KEY'] = 'vsgewvwesvsgevafdsag'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)  # Set token expiration time

migrate = Migrate(app, db)

db.init_app(app)

jwt = JWTManager(app)


# User Signup
@app.route('/signup', methods=['POST'])
def signup():
    
    data = request.get_json()
    
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token), 200

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], password=data['password']).first()

    # Check if the user exists
    if user:
        # Generate and return an access token for the user
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        # Return an error message for invalid credentials
        return jsonify(message="Invalid username or password"), 401

# Get all photos
@app.route('/photos', methods=['GET'])
def get_all_photos():
    photos = Photo.query.all()
    return jsonify(photos=[photo.serialize() for photo in photos]), 200

# Get a specific photo by ID
@app.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    photo = Photo.query.get(photo_id)
    if photo:
        return jsonify(photo.serialize()), 200
    else:
        return jsonify(message="Photo not found"), 404

# Create a new photo (requires authentication)
@app.route('/photos', methods=['POST'])
@jwt_required()
def create_photo():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        data = request.get_json()
        new_photo = Photo(title=data['title'], description=data['description'], image_url=data['image_url'], user=user)
        db.session.add(new_photo)
        db.session.commit()
        return jsonify(message="Photo created successfully"), 201
    else:
        return jsonify(message="User not found"), 404

# Delete a photo by ID (requires authentication)
@app.route('/photos/<int:photo_id>', methods=['DELETE'])
@jwt_required()
def delete_photo(photo_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        photo = Photo.query.get(photo_id)
        if photo and photo.user == user:
            db.session.delete(photo)
            db.session.commit()
            return jsonify(message="Photo deleted successfully"), 200
        else:
            return jsonify(message="Photo not found or unauthorized"), 404
    else:
        return jsonify(message="User not found"), 404

# Update a photo by ID (requires authentication)
@app.route('/photos/<int:photo_id>', methods=['PUT'])
@jwt_required()
def update_photo(photo_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        photo = Photo.query.get(photo_id)
        if photo and photo.user == user:
            data = request.get_json()
            photo.title = data.get('title', photo.title)
            photo.description = data.get('description', photo.description)
            db.session.commit()
            return jsonify(message="Photo updated successfully"), 200
        else:
            return jsonify(message="Photo not found or unauthorized"), 404
    else:
        return jsonify(message="User not found"), 404

# Like a photo by ID (requires authentication)
@app.route('/photos/<int:photo_id>/like', methods=['POST'])
@jwt_required()
def like_photo(photo_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        photo = Photo.query.get(photo_id)
        if photo:
            like = Like.query.filter_by(user=user, photo=photo).first()
            if not like:
                new_like = Like(user=user, photo=photo)
                db.session.add(new_like)
                db.session.commit()
                return jsonify(message="Photo liked successfully"), 201
            else:
                return jsonify(message="Photo already liked by the user"), 400
        else:
            return jsonify(message="Photo not found"), 404
    else:
        return jsonify(message="User not found"), 404

# Unlike a photo by ID (requires authentication)
@app.route('/photos/<int:photo_id>/like', methods=['DELETE'])
@jwt_required()
def unlike_photo(photo_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        photo = Photo.query.get(photo_id)
        if photo:
            like = Like.query.filter_by(user=user, photo=photo).first()
            if like:
                db.session.delete(like)
                db.session.commit()
                return jsonify(message="Photo unliked successfully"), 200
            else:
                return jsonify(message="Photo not liked by the user"), 400
        else:
            return jsonify(message="Photo not found"), 404
    else:
        return jsonify(message="User not found"), 404

# Get liked photos by a specific user (requires authentication)
@app.route('/user/<int:user_id>/liked-photos', methods=['GET'])
@jwt_required()
def get_liked_photos_by_user(user_id):
    current_user_id = get_jwt_identity()

    if current_user_id == user_id:
        user = User.query.get(user_id)
        liked_photos = (
            db.session.query(Photo)
            .join(Like)
            .filter(Like.user_id == user_id)
            .all()
        )

        return jsonify(
            liked_photos=[
                {
                    'id': photo.id,
                    'title': photo.title,
                    'description': photo.description,
                    'image_url': photo.image_url,
                }
                for photo in liked_photos
            ]
        ), 200
    else:
        return jsonify(liked_photos=[]), 200

# Get extra information about a photo by ID
@app.route('/photos/<int:photo_id>/extra-info', methods=['GET'])
def get_extra_photo_info(photo_id):
    photo = Photo.query.get(photo_id)
    
    if photo:
        return jsonify(extra_info={'creator': photo.user.username, 'description': photo.description}), 200
    else:
        return jsonify(message="Photo not found"), 404

# Get all posts for a specific user account (requires authentication)
@app.route('/user/<int:user_id>/posts', methods=['GET'])
@jwt_required()
def get_user_posts(user_id):
    current_user_id = get_jwt_identity()
    
    if current_user_id == user_id:
        user = User.query.get(user_id)
        user_posts = Photo.query.filter_by(user=user).all()
        return jsonify(user_posts=[post.serialize() for post in user_posts]), 200
    else:
        return jsonify(message="Unauthorized access"), 401

# Edit photo information by ID (requires authentication)
@app.route('/photos/<int:photo_id>/edit', methods=['PUT'])
@jwt_required()
def edit_photo_info(photo_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        photo = Photo.query.get(photo_id)
        if photo and photo.user == user:
            data = request.get_json()
            photo.title = data.get('title', photo.title)
            photo.description = data.get('description', photo.description)
            db.session.commit()
            return jsonify(message="Photo information updated successfully"), 200
        else:
            return jsonify(message="Photo not found or unauthorized"), 404
    else:
        return jsonify(message="User not found"), 404

# Get all users (requires authentication)
@app.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user_id = get_jwt_identity()
    users = User.query.filter(User.id != current_user_id).all()

    return jsonify(users=[user.serialize() for user in users]), 200

# User Logout (requires authentication)
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify(message="Logout successful"), 200
    
# # Delete liked photo

# @app.route('/photos/<int:photo_id>/delete-like', methods=['DELETE'])
# @jwt_required()
# def delete_like(photo_id):
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
    
#     if user:
#         photo = Photo.query.get(photo_id)
#         if photo:
#             like = Like.query.filter_by(user=user, photo=photo).first()
#             if like:
#                 db.session.delete(like)
#                 db.session.commit()
#                 return jsonify(message="Like deleted successfully"), 200
#             else:
#                 return jsonify(message="Like not found"), 404
#         else:
#             return jsonify(message="Photo not found"), 404
#     else:
#         return jsonify(message="User not found"), 404

# @app.route('/users', methods=['GET'])
# @jwt_required()
# def get_all_users():
#     users = User.query.all()
#     return jsonify(users=[user.serialize() for user in users]), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)