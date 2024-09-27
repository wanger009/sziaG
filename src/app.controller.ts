import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('hatterszin')
  @Render('hatter')
  hatterszin(@Query('bgColor') a : string = 'blue'){
     return{
     bgColor: a
    }
  }

#jegkremek = [
   {nev: 'Eperfagy', ar: '300'},
   {nev: 'Vanil', ar: '500'},
   {nev: 'Csok', ar:' 600'},
  ]
  @Get('jegkrem')
  @Render('jegkremlista')
  jegkremek(){
    return {
      jegkremek: this.#jegkremek
    }
  }


  @Get('jegkrem/:nev')
  @Render('jegkrem')
  jegkrem(@Param('nev') nev: string){
    for (let index = 0; index < 4; index++) {
      if (this.#jegkremek [index].nev == nev) {
        return {nev: this.#jegkremek[index].nev, ar: this.#jegkremek[index].ar}
      }
    }

    return {
      jegkremek: this.#jegkremek
    }

  }

  @Get('quotes')
  @Render('index')
  getProfile(){
    return {
      quotes: quotes.quotes
    }
  }

  randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  @Get('randomQuote')
  @Render('random')
  randomQuote(){
    const rndInt = this.randomIntFromInterval(0,29);
    return {
      quote: quotes.quotes[rndInt].quote,
      author: quotes.quotes[rndInt].author
    }
  }

  @Get('topAuthor')
  @Render('table')
  topAuthors(){
    const dict = new Map();
    for (let index = 0; index < quotes.quotes.length; index++) {
      if(dict.has(quotes.quotes[index].author)){
        let num = dict.get(quotes.quotes[index].author);
        num++;
        dict.set(quotes.quotes[index].author, num);
      }
      else{
        dict.set(quotes.quotes[index].author, 1)
      }
    }
    return {
      dict
    }
  }

  @Get('quotes/:id')
  @Render('quotess')
  quotess(@Param('id') id: number){
    
    for (let index = 0; index < quotes.quotes.length; index++) {
      if (quotes.quotes[index].id == id) {
        return {
          quote: quotes.quotes[index].quote,
        }
      }
    }
  }
@Get('deleteQuote/:id')
@Render('quotes')
deleteQuote(@Param('id') id: number){
  for (let index = 0; index < quotes.quotes.length; index++) {
    if (quotes.quotes[index].id == id) {
      quotes.quotes.splice(index, 1);
    }
  }
  return {
    quotes: quotes.quotes
  }


}
