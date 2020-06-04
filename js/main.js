'use strict';

var NAMES = ['Артём', 'Аня', 'Яна', 'Лена', 'Антон', 'Сергей'];
var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var countOfPhoto = 25;
var photosData = [];
var minLikes = 15;
var maxLikes = 200;
var maxAvatars = 6;
var photoTemplate = document.querySelector('#picture');
var picturesContainer = document.querySelector('.pictures');

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

var createComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandom(1, maxAvatars) + '.svg',
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
  for (var i = 0; i < countOfPhoto; i++) {
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

createData();
appendAllPhoto();
