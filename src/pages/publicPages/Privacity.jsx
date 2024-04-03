import React from "react";
import { Link } from "react-router-dom";

export const Privacity = () => {
  return (
    <section className="min-h-screen">
      <nav className="border-b-2 border-gray-300 py-5">
        <div className="container mx-auto flex items-center">
          <Link to="/login">
            <img
              src="/assets/isotipoCheese.png"
              alt="Cheese logo"
              className="w-20 mr-10"
            />
          </Link>
          <h1 className="text-4xl text-primary font-bold">Privacy Policy</h1>
        </div>
      </nav>
      <article className="container mx-auto py-10 text-justify">
        <h2 className="text-3xl mb-5 font-bold">
          Política de Privacidad de Cheese
        </h2>
        <p className="mb-2">
          Última actualización:{" "}
          <span className="font-bold">3 de abril de 2024</span>
        </p>
        <p className="mb-2">
          Esta Política de Privacidad describe cómo se recopila, utiliza y
          comparte la información personal cuando usted utiliza la aplicación
          móvil Cheese (en adelante, "la Aplicación").
        </p>
        <p className="font-bold text-2xl mb-2">Información que Recopilamos</p>
        <p className="font-bold text-xl mb-2">
          Información que Usted Nos Proporciona
        </p>
        <p>
          Cuando usted utiliza nuestra Aplicación, puede proporcionarnos la
          siguiente información:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Nombre de Usuario: El nombre que usted elige para identificarse
            dentro de la Aplicación.
          </li>
          <li>
            Foto de Perfil: Una foto que usted puede elegir para representar su
            cuenta dentro de la Aplicación.
          </li>
          <li>
            Correo Electrónico: Su dirección de correo electrónico, utilizada
            para fines de registro y comunicación.
          </li>
          <li>
            Contraseña: Una contraseña que usted elige para proteger su cuenta.
          </li>
          <li>
            Alergias: Información opcional que usted puede proporcionar sobre
            alergias alimentarias o restricciones dietéticas.
          </li>
        </ul>
        <p className="font-bold text-xl my-2">
          Información de los Restaurantes
        </p>
        <p>
          Cuando los restaurantes utilizan nuestra Aplicación, podemos recopilar
          la siguiente información:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Foto del Restaurante: Una foto del restaurante que se muestra en la
            Aplicación.
          </li>
          <li>
            Platos: Información sobre los platos que el restaurante ofrece, que
            se muestra en la Aplicación.
          </li>
          <li>
            Dirección: La dirección física del restaurante, utilizada para
            mostrar la ubicación en la Aplicación y proporcionar direcciones a
            los usuarios.
          </li>
          <li>
            Número de Teléfono: Un número de teléfono de contacto del
            restaurante.
          </li>
        </ul>
        <p className="font-bold text-xl my-2">Información de Ubicación</p>
        <p>
          Si usted decide permitir el acceso a la ubicación de su dispositivo
          móvil mientras utiliza nuestra Aplicación, podremos recopilar
          información de ubicación precisa o aproximada. Es importante destacar
          que esta información de ubicación no se almacenará en nuestra base de
          datos.
        </p>
        <p className="font-bold text-xl my-2">Uso de la Información</p>
        <p>
          Utilizamos la información recopilada para los siguientes propósitos:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Funcionalidad de la Aplicación: Para proporcionar y mantener la
            funcionalidad de la Aplicación, permitiendo a los usuarios buscar
            restaurantes y ver información relevante.
          </li>
          <li>
            Personalización: Para personalizar la experiencia del usuario dentro
            de la Aplicación, como mostrar recomendaciones de restaurantes
            basadas en sus preferencias.
          </li>
          <li>
            Comunicación: Para comunicarnos con usted, como enviar correos
            electrónicos relacionados con la cuenta, notificaciones sobre la
            Aplicación y promociones.
          </li>
          <li>
            Mejora de Servicios: Para analizar el uso de la Aplicación y mejorar
            nuestros servicios, incluyendo la mejora de la usabilidad y la
            funcionalidad.
          </li>
        </ul>
        <p className="font-bold text-xl my-2">Compartir Información</p>
        <p>
          No vendemos, alquilamos ni compartimos información personal de
          nuestros usuarios, excepto en las siguientes circunstancias:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Restaurantes Registrados: Los datos de los restaurantes, como la
            foto del restaurante, los platos, la dirección y el número de
            teléfono, se comparten públicamente dentro de la Aplicación para que
            los usuarios puedan encontrar y contactar a los restaurantes.
          </li>
          <li>
            Proveedores de Servicios: Podemos compartir información con
            proveedores de servicios que necesitan acceder a dicha información
            para realizar servicios en nuestro nombre (por ejemplo,
            procesamiento de pagos, servicios de análisis, etc.).
          </li>
          <li>
            Cumplimiento Legal: Podemos divulgar información cuando creemos de
            buena fe que la divulgación es necesaria para cumplir con una
            obligación legal, proteger nuestros derechos, prevenir fraudes o
            proteger la seguridad de nuestros usuarios.
          </li>
        </ul>
        <p className="font-bold text-xl my-2">Sus Derechos</p>
        <p>
          Usted tiene ciertos derechos con respecto a su información personal,
          incluyendo el derecho a acceder, corregir, eliminar y objetar el uso
          de su información. Puede ejercer estos derechos poniéndose en contacto
          con nosotros a través de los datos de contacto proporcionados al final
          de esta Política de Privacidad.
        </p>
        <p className="font-bold text-xl my-2">Seguridad de los Datos</p>
        <p>
          Tomamos medidas razonables para proteger la información personal de
          nuestros usuarios. Sin embargo, tenga en cuenta que ninguna medida de
          seguridad es absoluta y que ningún método de transmisión a través de
          Internet o almacenamiento electrónico es 100% seguro.
        </p>
        <p className="font-bold text-xl my-2">
          Cambios en esta Política de Privacidad
        </p>
        <p>
          Nos reservamos el derecho de actualizar esta Política de Privacidad en
          cualquier momento. Le notificaremos cualquier cambio publicando la
          nueva Política de Privacidad en esta página.
        </p>
        <p className="font-bold text-xl my-2">Contacto</p>
        <p>
          Si tiene alguna pregunta sobre esta Política de Privacidad, puede
          ponerse en contacto con nosotros en:{" "}
          <a
            href="mailto:alexvidalcasado@gmail.com"
            className="text-blue-500 hover:underline"
          >
            alexvidalcasado@gmail.com
          </a>
        </p>
      </article>
    </section>
  );
};
