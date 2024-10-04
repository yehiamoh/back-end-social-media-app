# Welcome to Social media App 👋

It is a backend application , built with Node.js and TypeScript. It leverages PorstgreSQl for data storage and prisma as the Object Relational Modeling (ORM) library to simplify database interactions.
# Routes 
 __. /auth__ 
 
 __. /user__ 

 __. /posts__ 

# End Points

__. POST V0/api/auth/register__  

__. POST V0/api/auth/login__  

__. PUT V0/api/auth/reset-password__ 

__. GET V0/api/user/profile__ 

__. POST V0/api/user/:followedUserId/follow__ 

__. POST V0/api/user/:followedUserId/unfollow__ 

__. GET V0/api/user/feed__  

__. GET V0/api/posts__

__. POST V0/api/posts__

__. GET V0/api/posts/:postId__

__. PUT V0/api/posts/:postId__

__. DELETE V0/api/posts/:postId__

__. POST V0/api/posts/:postId/like__

__. DELETE V0/api/posts/:postId/unlike__

__. POST V0/api/posts/:postId/comment__

__. DELETE V0/api/posts/:postId/comment__

## Database Schema

The application uses a PostgreSQL database with the following models defined in Prisma.

### User

| Field       | Type      | Description                       |
|-------------|-----------|-----------------------------------|
| `user_id`   | String    | Unique identifier for the user   |
| `user_name` | String    | Name of the user                 |
| `email`     | String    | Unique email address              |
| `password`  | String    | Hashed password for authentication |
| `bio`       | String?   | Optional bio for the user        |
| `created_At`| DateTime  | Timestamp of when the user was created |
| `updated_At`| DateTime  | Timestamp of the last update      |

### Follows

| Field         | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| `follower_id` | String    | User ID of the follower                  |
| `following_id`| String    | User ID of the user being followed      |
| `createdAt`   | DateTime  | Timestamp of when the follow was created |

### Posts

| Field       | Type      | Description                          |
|-------------|-----------|--------------------------------------|
| `post_id`   | String    | Unique identifier for the post      |
| `user_id`   | String    | ID of the user who created the post |
| `content`   | String    | Content of the post                 |
| `media_url` | String?   | Optional URL for media attached to the post |
| `created_at`| DateTime  | Timestamp of when the post was created |
| `updated_at`| DateTime  | Timestamp of the last update         |

### Likes

| Field       | Type      | Description                             |
|-------------|-----------|-----------------------------------------|
| `like_id`   | String    | Unique identifier for the like         |
| `user_id`   | String    | ID of the user who liked the post      |
| `post_id`   | String    | ID of the post being liked              |
| `created_at`| DateTime  | Timestamp of when the like was created  |

### Comments

| Field       | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| `comment_id`| String    | Unique identifier for the comment     |
| `post_id`   | String    | ID of the post being commented on     |
| `user_id`   | String    | ID of the user who made the comment   |
| `text`      | String    | Content of the comment                 |
| `created_At`| DateTime  | Timestamp of when the comment was created |


