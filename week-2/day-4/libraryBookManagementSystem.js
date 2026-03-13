class Book{
    title;
    author;
    pages;
    isAvailable;
    constructor(title,author,pages){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isAvailable=true
    }
    borrow(){
        if(this.isAvailable==true){
        this.isAvailable=false
        console.log("The book is borrowed successfully")
        }
        else{[
            console.log("The required book is not available")
        ]}
    }
    returnBook(){
        this.isAvailable=true
        console.log("The book is returned successfully")
    }
    getInfo(){
        return `${this.title} by ${this.author}(${this.pages})`
    }
    isLongBook(){
        if(this.pages>300)
            return true
        return false
    }
}
let book1=new Book('Harry Potter','JK.Rowling',200)
let book2=new Book('1984','Shyam',320)
let book3=new Book('The Atomic Habbits','Gopi',500)
let book4=new Book('Harry Potter-1','JK.Rowling',800)
let book5=new Book('The Hobbit','Sneha',439)
let books=[]
books.append(book1)
books.append(book2)
books.append(book3)
console.log(book1.getInfo())
console.log(book2.getInfo())
console.log(book3.getInfo())
console.log(book4.getInfo())
console.log(book5.getInfo())
book1.borrow()
book3.borrow()
console.log("Availability status",book1.getInfo())
console.log("Availability status",book3.getInfo())
book1.returnBook()
console.log("Availability status",book1.getInfo())
if(book1.isLongBook()==true)
    console.log()
    console.log(book1.getInfo())
if(book1.isAvailable==true)
    console.log(book1.getInfo())
if(book2.isAvailable==true)
    console.log(book1.getInfo())
if(book3.isAvailable==true)
    console.log(book1.getInfo())
if(book4.isAvailable==true)
    console.log(book1.getInfo())
if(book5.isAvailable==true)
    console.log(book1.getInfo())