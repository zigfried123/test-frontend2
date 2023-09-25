let headers = new Headers();
headers.append('Origin', 'http://localhost:3006');


Vue.component('posts', {
    props: [],
    data: function () {
        return {
            posts: [],
            postsAll: [],
        }
    },

    template: `
        <div class="posts">
            <div class="search"><input style="width:500px" type="search"><i v-on:click="search"
                                                                            style="font-size: 2rem; color: cornflowerblue;"
                                                                            class="bi bi-search"></i></div>
            <div style="text-align:right"><input style="display:none;width:500px" class="post-new-input"><i
                    v-on:click="add" class="bi-file-plus add-post" style="font-size: 2rem; color: cornflowerblue;"></i>
            </div>
            <div class="post-row" :id="post.id" v-for="post in posts">

                <span v-on:click="changeColor" class="post-name text-success">{{ post.name }}</span>
                <i v-on:click="edit" class="bi-pencil-square edit-post"
                   style="font-size: 2rem; color: cornflowerblue;"></i>
                <i v-on:click="remove" class="bi-x-lg delete-post" style="font-size: 2rem; color: cornflowerblue;"></i>

            </div>

        </div>`,

    methods: {
        search(e) {
            let searchVal = $(e.target).prev().val().trim();
            if (searchVal === '') {
                if (this.postsAll.length) {
                    this.posts = this.postsAll;
                }
            } else {
                this.posts = this.posts.filter(v => {
                    return v.name.includes(searchVal);
                });
            }
        },
        changeColor(e) {
            $(e.target).css('background', 'lightgray');
        },
        add(e) {
            $('.post-new-input').show();
            let posts = this.posts;

            //сохраняем новый post
            $('.post-new-input').focusout(function (e) {
                let post = $(e.target).val();
                var abc = "123456789abcdefghijklmnopqrstuvwxyz";
                var rs = "";
                while (rs.length < 25) {
                    rs += abc[Math.floor(Math.random() * abc.length)];
                }
                if (post !== '') {
                    posts.unshift({"id": rs, "name": `${post}`});
                }
                $('.post-new-input').val('');
            });
        },
        remove(e) {

            $(e.target).parent('.post-row').find('.post-name').css('background', 'white');

            let id = $(e.target).parent().attr('id');

            let postIndex = this.posts.findIndex(v => {
                return v.id === id;
            })

            if (postIndex !== false) {
                this.posts.splice(postIndex, 1);
            }

            let postAllIndex = this.postsAll.findIndex(v => {
                return v.id === id;
            })

            if (postAllIndex !== false) {
                this.postsAll.splice(postAllIndex, 1);
            }
        },
        edit(e) {
            let id = $(e.target).parent().attr('id');
            let buttonEdit = $(e.target);
            let buttonDelete = $(e.target).next('.delete-post');
            let postEl = $(buttonEdit).prev();
            let editValue = $(postEl).text();

            $(e.target).before(`<input class="post-input" style="width:${$(postEl).width()}" type="text" value="${editValue}">`);
            $(postEl).hide();
            
            buttonEdit.hide();
            buttonDelete.hide();

            let posts = this.posts;
            $('.post-input').focusout(function () {
                let postIndex = posts.findIndex(v => {
                    return v.id === id;
                })
                posts[postIndex].name = $(this).val();
                $(postEl).show();
                $('.post-input').remove();
                buttonEdit.show();
                buttonDelete.show();
            })

        }
    },
    mounted: function () {
        // `this` указывает на экземпляр компонента
        let result = fetch('http://localhost:3006/test.json', {
            headers: headers
        })
            .then(x => x.json())
            .then(x => {
                this.posts = x.posts;
                this.postsAll = x.posts;
            })
    },

})

var app = new Vue({
    el: '#app',
    props: []
})

