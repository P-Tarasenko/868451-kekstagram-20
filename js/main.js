'use strict';

var NAMES = ['Артём', 'Аня', 'Яна', 'Лена', 'Антон', 'Сергей'];
var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var COUNT_OF_PHOTO = 25;
var MAX_AVATARS = 6;
var photosData = [];
var minLikes = 15;
var maxLikes = 200;
var photoTemplate = document.querySelector('#picture');
var picturesContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var commentsList = bigPicture.querySelector('.social__comments');
var commentsCount = bigPicture.querySelector('.social__comment-count');
var commentLoader = bigPicture.querySelector('.comments-loader');

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

var createComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandom(1, MAX_AVATARS) + '.svg',
    message: MESSAGES[getRandom(0, 5)],
    name: NAMES[getRandom(0, 5)]
  };

  return comment;
};

var createPhoto = function (url) {
  var countOfComments = getRandom(1, 5);
  var photo = {};
  photo.url = url;
  photo.description = '';
  photo.likes = getRandom(minLikes, maxLikes);
  photo.comments = [];

  for (var j = 0; j <= countOfComments; j++) {
    photo.comments[j] = createComment();
  }

  return photo;
};

var createData = function () {
  for (var i = 0; i < COUNT_OF_PHOTO; i++) {
    photosData[i] = createPhoto('photos/' + (i + 1) + '.jpg');
  }
};

var createPhotoElement = function (i) {
  var photoElement = photoTemplate.content.cloneNode(true);
  var img = photoElement.querySelector('.picture__img');
  var like = photoElement.querySelector('.picture__likes');
  var comment = photoElement.querySelector('.picture__comments');

  img.setAttribute('src', photosData[i].url);
  like.textContent = photosData[i].likes;
  comment.textContent = photosData[i].comments.length;

  return photoElement;
};

var appendAllPhoto = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosData.length; i++) {
    fragment.appendChild(createPhotoElement(i));
  }

  picturesContainer.appendChild(fragment);
};

var clearCommentsList = function () {
  Array.from(commentsList.children).forEach(function (elem) {
    elem.remove();
  });
};

var createCommentElements = function () {
  var commentElement = bigPicture.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosData[0].comments.length; i++) {
    var newCommentElement = commentElement.cloneNode(true);
    var newCommentElementImg = newCommentElement.querySelector('.social__picture');
    var newCommentElementMessage = newCommentElement.querySelector('.social__text');

    newCommentElementImg.setAttribute('src', photosData[0].comments[i].avatar);
    newCommentElementImg.setAttribute('alt', photosData[0].comments[i].name);
    newCommentElementMessage.textContent = photosData[0].comments[i].message;
    fragment.appendChild(newCommentElement);
  }

  return fragment;
};

var changeBigPicture = function () {
  var fragment = createCommentElements();
  var img = bigPicture.querySelector('.big-picture__img').children[0];
  var likes = bigPicture.querySelector('.likes-count');
  var comments = bigPicture.querySelector('.comments-count');
  var desc = bigPicture.querySelector('.social__caption');

  img.setAttribute('src', photosData[0].url);
  likes.textContent = photosData[0].likes;
  comments.textContent = photosData[0].comments.length;
  desc.textContent = photosData[0].description;

  clearCommentsList();
  commentsList.appendChild(fragment);
};

createData();
appendAllPhoto();
document.querySelector('body').classList.add('modal-open');
bigPicture.classList.remove('hidden');
changeBigPicture();
commentsCount.classList.add('hidden');
commentLoader.classList.add('hidden');

