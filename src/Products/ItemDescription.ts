// Football
export const Football = `It is widely assumed that the word "football" (or "foot ball") references the action of the foot kicking a ball.`

//Baseball
export const Baseball = `Image result for baseball
Baseball is a bat-and-ball game played between two opposing teams, of nine players each, that take turns batting and fielding.`

//BasketBall
export const Basketball = `Only five players per team on the court. ...
Score more than your opponent to win. ...
Score within the shot clock. ...
Dribbling advances the ball.`

//Ipod Touch
export const iPodTouch = `
For most people, the iPod touch is not worth buying in 2021. While the $199 entry-level price point is very attractive, the iPod touch sports a chip that is almost half a decade old. It also has pretty weak cameras by today's standards`

//iphone5
export const iPhone5 = ` It's not going to "shut down". You're not going to get a new 5S from anywhere; they haven't been produced in years. You will find that the 5s will run fewer and fewer apps because it cannot run the most up-to-date software.`

//nexus7About
export const Nexus7 = `
It is currently the only major supported operating system for the device, as Android 6.0.1 (the last version of Android that Google supplied the system with) has not received security patches since September 2018.`

export const productArr: string[] = [Football, Basketball, Baseball, iPhone5, iPodTouch, Nexus7]

interface IProductInfo {
  Football: string
  Baseball: string
  Basketball: string
  iPodTouch: string
  iPhone5: string
  Nexus7: string
}

export const productInfo: IProductInfo = {
  Football: Football,
  Baseball: Baseball,
  Basketball: Basketball,
  iPodTouch: iPhone5,
  iPhone5: iPhone5,
  Nexus7: Nexus7
}
