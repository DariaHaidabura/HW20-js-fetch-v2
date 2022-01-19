let postContainer = document.getElementById('post-list');
let commentsContainer = document.getElementById('comments-list')

class Post {
  constructor(elPost, elComments) {
   this.elPost = elPost;
   this.elComm = elComments;
   this.postResource = new PostResource();
   document.querySelector('button').addEventListener('click', () => this.showNewComments());
  }
  getComments(id) {
    this.postResource.getComments(id)
    .then(comments => comments.json())
    .then(comments => this.showComments(comments));
  }
  showPost(post) {
    this.elPost.innerHTML = `<p class="title">Posts №${post.id}</p><li class="desc">${post.title}</li><li class="desc">${post.body}</li>`;
  }

  showComments(comments) {
   this.elComm.innerHTML = `<p class="title">Comments:`
    + comments.map((comment) => {
        return `<p class="comment">Comment №${comment.id}<li class="desc">${comment.name}</li><li class="desc">${comment.body}</li>`;
      }).join('');
  }

  showNewComments() {
    let id = document.getElementById('1').value;
    let name = document.getElementById('2').value;
    let body = document.getElementById('3').value;
    this.elComm.innerHTML += `<p class="comment">Comment №${id}<li class="desc">${name}</li><li class="desc">${body}</li>`;
  }
  async render() {
   let post = await this.postResource.getPost(1);
   this.showPost(post);
   let comments = await this.postResource.getComments(post.id);
   this.showComments(comments);
  }
}

class PostResource {
  constructor() {
    this.getPostUrl = 'https://jsonplaceholder.typicode.com/posts/';
  }
  async getPost(id) {
    let post = await fetch(this.getPostUrl + id);
    return await post.json();
  }
  async getComments(id) {
    let comments = await fetch(this.getPostUrl + id + '/comments');
    return await comments.json();
  }
}

let post = new Post(postContainer, commentsContainer);
post.render();



