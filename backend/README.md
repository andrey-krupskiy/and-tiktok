# Installation & use

1. Make sure you use (fnm)[https://github.com/Schniz/fnm] or (nvm)[https://github.com/nvm-sh/nvm].
2. `npm install`
3. To run the backend: `npm start`

# Endpoints

## `GET /feed`
TODO

## `GET /`
Returns an `index.html` page, where a video `1.mp4` is played.

## `GET /videos/:id`
Where: `:id` -- video id. For now video `id` = filename - extension.
For `dog.mp4` you need to call `GET /video/dog`

Streams a video to the client. Compatible with the `video` html5 element.

## `GET /videos`
Returns the filenames of all uploaded videos.

## `POST /upload_video`
Uploads a video to the `video_data` folder.
At the moment, no checks are made for file duplicates or file extensions.

Curl command to upload a video:
`curl -F file=@filepath localhost:3000/upload_video`

E.g.: 
`curl -F file=@/Users/krup/Downloads/dog_2.mp4 localhost:3000/upload_video`
