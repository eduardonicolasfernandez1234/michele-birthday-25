import { Component, signal } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  allShowed = signal(false);

  pictures = [
    "picture-1",
    "picture-2",
    "picture-3",
    "picture-4",
  ]

  publicPictures = signal<string[]>([]);
  hoveredBlock: string = '';
  currentText = '';

  textsByType: Record<string, string[]> = {
    'animated-1': [
      '25 de agosto: el día que todo cambió. Ese día, una estrella empezó a brillar ✨, llenando de magia los corazones de tus seres queridos y cambiando la vida de muchas personas, siendo un regalo de Dios 🎁.',
      'Desde que naciste, la vida cobró color. Tu sonrisa no tiene comparación; haces que todo valga la pena. Eres magia, sueño, arte y amor. Doy gracias por tu existencia, porque nada se compara con tu luz.',
    ],
    'picture-1': [
      '¿Chicharrón? ¡Tu debilidad deliciosa! 🐷',
      'Eres mi persona favorita.',
      'Un antojo a tu lado sabe mejor :D .',
      'Eres más rica que el chicharrón (y eso es decir mucho). 😋',
      'El sabor de tu risa supera cualquier receta.',
      'Tú + chicharrón = felicidad garantizada.',
      'Eres mi plan favorito para salir a comer.',
      'Eres el menú que siempre quiero repetir. 🍽️',

      'No sé qué es más sabroso: el chicharrón… o tu. 😍',
      'Tienes el superpoder de hacer que cualquier comida se sienta como fiesta.',
      'Verte disfrutar una comida rica es mi forma favorita de ver alegría.',
      'Te mereces todos los platos del mundo… pero yo me conformo con compartir el mío contigo.',
      'Eres como ese lugar favorito para comer: reconfortante, inolvidable y siempre delicioso.',
      'Contigo aprendí que la comida no solo alimenta el cuerpo, también el alma.',
      'Si el amor tuviera sabor, sabría a tus risas mientras comemos chicharrón.',
    ],
    'picture-2': [
      'Tu inteligencia me deja sin palabras. 🧠',
      'Hablando idiomas y conquistando corazones.',
      'Eres un libro abierto lleno de sabiduría.',
      'Curiosa, brillante y única.',
      'Tu mente es tan bella como tú.',
      'Hablas muchos idiomas, pero siempre hablas con la verdad.',
      'Saber es poder, y tú tienes todo ese poder.',
      'Tus ideas siempre iluminan mi camino.',

      'Me encanta cómo tus ideas siempre aportan luz y creatividad a todo lo que haces.',
      'Cada idioma que hablas es una ventana más que abres al mundo y a mí.',
      'Tu curiosidad me inspira a aprender y crecer junto a ti cada día.',
      'Tienes el don de entender lo complejo y convertirlo en algo sencillo y hermoso.',
      'A tu lado, cada conversación es un viaje fascinante por mundos nuevos.',
      'Admiro cómo aprendes, enseñas y creces sin dejar de ser la mujer dulce que eres.',

      'Me fascina cómo tu inteligencia se mezcla con esa sensibilidad tan especial, haciendo que cada palabra tuya tenga peso y dulzura.',
      'A través de tus conocimientos, abres puertas y ventanas que me invitan a ver el mundo con más profundidad y amor.',
      'No solo eres hermosa por fuera, sino que tu mente y espíritu reflejan una belleza aún más grande y admirable.',
      'Tu capacidad para comprender y adaptarte a diferentes culturas y lenguas me enseña que el verdadero conocimiento está en el corazón.',
      'Eres un puente entre mundos y un refugio para mi alma; tu sabiduría es un regalo que valoro infinitamente.',
      'La forma en que combinas tu inteligencia con tu sensibilidad crea una magia que transforma todo a tu alrededor.',
    ],
    'picture-3': [
      'Morat en el alma y en el corazón. 🎶',
      'Tu risa es mi canción favorita.',
      'Tu sonrisa es un hit en mi playlist.',
      'Eres mi cover favorito.',

      'Escuchar a Morat contigo es como vivir un sueño hecho canción.',
      'Tu energía contagiosa hace que cada momento sea una fiesta.',
      'Cada nota de Morat me recuerda a ti y a tu hermosa esencia.',
      'Tienes esa chispa que hace que todo sea divertido y especial.',

      'Cada vez que escucho una canción de Morat, pienso en ti y en cómo llenas mi vida de armonía y alegría.',
      'Gracias por enseñarme que la vida es mejor cuando se vive con música, risas y amor genuino.',
      'Al ritmo de Morat y tu alegría, caminamos juntos hacia un futuro lleno de sueños y canciones.',
      'Eres mi canción favorita, aquella que tarareo sin cesar y que llena mi corazón de ternura y diversión.',
      'En cada nota y en cada acorde de las canciones de Morat, encuentro un pedacito de ti que me hace amarte aún más profundamente.',
    ],
    'picture-4': [
      'Fuerte y valiente, fue lo primero que pense de ti.',
      'Sensibilidad tierna que abraza hasta el alma.',
      'Mujer valiente y bella.',
      'Detrás de tu sonrisa, un gran corazón.',
      'Eres luz en los momentos difíciles.',

      'Detrás de esa sonrisa dulce, hay una mujer increíblemente fuerte y valiente que enfrenta todo con coraje.',
      'Eres la combinación perfecta de ternura y determinación que inspira a todos a tu alrededor.',
      'Eres un faro de luz para quienes te conocemos, siempre mostrando fuerza y empatía.',
      'Tu fortaleza y dulzura hacen que todo a tu alrededor sea un lugar mejor.',

      'Gracias por mostrarme que la verdadera fuerza viene del corazón, y que la ternura puede mover montañas.',
      'Tu vida es un testimonio hermoso de la valentía y la dulzura, un camino que admiro profundamente y celebro siempre.',
    ],
  };

  showPicture() {
    this.allShowed.set(true);
    if (!this.allShowed() && this.pictures.length == 0) {
      return;
    }

    this.publicPictures.update(val => [...val, this.pictures.pop()!]);
    gsap.fromTo(".box", { autoAlpha: 0, x: -200 },
      { autoAlpha: 0.5, x: 200, duration: 1 });
  }

  showText(type: string) {
    this.hoveredBlock = type;

    const texts = this.textsByType[type];
    if (!texts || texts.length === 0) {
      this.currentText = '';
      return;
    }

    // Elegir uno aleatorio
    const randomIndex = Math.floor(Math.random() * texts.length);
    this.currentText = texts[randomIndex];
  }

  hoverImage(type: string) {
    console.log(type);
    this.hoveredBlock = type;
  }

  leaveImage() {
    this.hoveredBlock = '';
    this.currentText = '';
  }
}
