# Content Management Guide

This guide provides instructions on how to add, update, and delete articles in your application.

## Articles

Articles are managed via a REST API. You can use tools like `curl` or Postman to interact with the API.

### Creating a New Article

To create a new article, send a `POST` request to `/api/articles` with the article data in the request body.

**Example `curl` command:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "My New Article",
  "excerpt": "A short summary of my new article.",
  "content": "The full content of the article goes here.",
  "category": "Technology",
  "author": "John Doe",
  "image": "https://example.com/image.jpg"
}' "http://localhost:5173/api/articles"
```

### Updating an Existing Article

To update an existing article, send a `PUT` request to `/api/articles/:id`, where `:id` is the ID of the article you want to update. Include the fields you want to update in the request body.

**Example `curl` command:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "title": "My Updated Article Title"
}' "http://localhost:5173/api/articles/your_article_id"
```

### Deleting an Article

To delete an article, send a `DELETE` request to `/api/articles/:id`, where `:id` is the ID of the article you want to delete.

**Example `curl` command:**

```bash
curl -X DELETE "http://localhost:5173/api/articles/your_article_id"
```

## Images and Videos

### Images

The `image` field in the `Article` model is a string that stores the URL of the image. To add an image to an article, you must first upload it to an image hosting service (such as AWS S3, Cloudinary, or Imgur) and then include the URL in the `image` field when creating or updating the article.

### Videos

There is no dedicated video field in the `Article` model. To include a video in an article, you can embed it in the `content` field using an `<iframe>` or a similar HTML tag. You will need to get the embed code from your video hosting service (such as YouTube or Vimeo).
