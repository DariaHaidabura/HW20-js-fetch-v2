let postContainer = document.querySelector('ul');

class Post {
  constructor(el) {
   this.el = el;
   this.postResource = new PostResource();
   document.querySelector('button').addEventListener('click', () => this.addComments());
  }
  getComments(post) {
    this.postResource.getComments()
    .then(comments => comments.json())
    .then(comments => this.showPostAndComments(post, comments));
  }
  showPostAndComments(post, comments) {
    this.el.innerHTML = `<p class="title">Posts №${post.id}</p><li class="desc">${post.title}</li><li class="desc">${post.body}</li>` + `<p class="title">Comments:`
    + comments.map((comment) => {
        return `<p class="comment">Comment №${comment.id}<li class="desc">${comment.name}</li><li class="desc">${comment.body}</li>`;
      }).join('');
  }
  addComments() {
    let div = document.createElement('div');
    div.id = 'new-comment';
    let id = document.getElementById('1').value;
    let name = document.getElementById('2').value;
    let body = document.getElementById('3').value;
    div.innerHTML = `<p class="comment">Comment №${id}<li class="desc">${name}</li><li class="desc">${body}</li>`;
    this.el.after(div);
  }
  render() {
    this.postResource.getPost()
      .then(post => post.json())
      .then(post => this.getComments(post));
  }
}

class PostResource {
  constructor() {
    this.getPostUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    this.getCommentsUrl = 'https://jsonplaceholder.typicode.com/posts/1/comments';
  }
  getPost() {
    return fetch(this.getPostUrl);
  }
  getComments() {
    return fetch(this.getCommentsUrl);
  }
}

let post = new Post(postContainer);
post.render();



