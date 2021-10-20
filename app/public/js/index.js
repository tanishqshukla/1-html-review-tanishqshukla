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
           "books": [],
           "offers": [],
            "offerForm": {},
            selectedOffer : null
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
        fetchBookData() {
            fetch('/api/books/')
                .then(response => response.json())
                .then((parsedJson) => {
                    this.books = parsedJson;                    
                })
                .catch((err) => {
                    console.error(err);
                })
        },
    
    postNewOffer(evt) {
        // this.offerForm.studentId = this.selectedStudent.id;        

        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json())
          .then( json => {console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;

            // reset the form
            this.offerForm = {};
          });
      }

    },

    created() {
        this.fetchUserData();
        this.fetchBookData();
        console.log(this.books);
    } //end created
} // end Offer config
Vue.createApp(Offer).mount('#offerApp');