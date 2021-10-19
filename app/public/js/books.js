const Books = {
    data() {
        return {
            'books_list': []
        }
    },
    methods: {
        fetchBooksData() {
            fetch('/api/books/books.php')
            .then( response => response.json())
            .then( (responseJson) => {                                
                this.books_list = responseJson;       
                console.log(this.books_list);                         
            })
            .catch( (err) => {
                console.error(err);
            })
        }
    },
    created() {        
        this.fetchBooksData();
        console.log(this.books_list);
    }
}

Vue.createApp(Books).mount('#books');