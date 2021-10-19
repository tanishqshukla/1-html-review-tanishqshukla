const Offer = {
    data() {
        return {
            "person": {
                name: {},
                location: {},
                dob: {},
                registered: {},
                picture: {}
            },
           "books": []
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
                .format('D MMM YYYY')
        }
    },
    methods: {
         fetchUserData() {
              console.log("A");
             fetch('https://randomuser.me/api/')
                 .then(response => response.json())
                 .then((responseJson) => {
                      console.log(responseJson);
                      console.log("C");
                     this.person = responseJson.results[0];
                 })
                 .catch((err) => {
                     console.error(err);
                 })
              console.log("B");

        },
        fetchBooksData() {
            fetch('/api/books/')
                .then(response => response.json())
                .then((responseJson) => {
                    this.books = responseJson;                    
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    },
    created() {
        this.fetchUserData();
        this.fetchBooksData();
        console.log(this.books);
    } //end created
} // end Offer config
Vue.createApp(Offer).mount('#offerApp');