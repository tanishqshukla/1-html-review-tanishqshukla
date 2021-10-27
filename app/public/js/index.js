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
    
        postOffer(evt) {
            if (this.selectedOffer === null) {
                this.postNewOffer(evt);
            } 
            else {
                this.postEditOffer(evt);
            }
          },

    postNewOffer(evt) {
        // this.offerForm.studentId = this.selectedStudent.id;        

        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;

            // reset the form
            this.resetOfferForm();

        })

        .catch( err => {
          alert("Please fill the requirements!");
        });
    },

    postEditOffer(evt) {
      // this.offerForm.studentId = this.selectedStudent.id;
      this.offerForm.id = this.selectedOffer.id;

      // console.log("Updating!", this.offerForm);

      fetch('api/books/update.php', {
          method:'POST',
          body: JSON.stringify(this.offerForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

          // reset the form
          this.resetOfferForm();
        });
    },

    postDeleteOffer(o) {
      if (!confirm("Are you sure you want to delete the offer from "+o.id+"?")) {
        return;
      }
      console.log("Delete!", o);

      fetch('api/books/delete.php', {
          method:'POST',
          body: JSON.stringify(o),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

          // reset the form
          this.resetOfferForm();
        });
    },

    selectOfferToEdit(o) {
        this.selectedOffer = o;
        this.offerForm = Object.assign({}, this.selectedOffer);
    },

    resetOfferForm() {
        this.selectedOffer = null;
        this.offerForm = {};
      }

    },

    created() {
        this.fetchUserData();
        this.fetchBookData();
        console.log(this.books);
    } //end created
} // end Offer config
Vue.createApp(Offer).mount('#offerApp');