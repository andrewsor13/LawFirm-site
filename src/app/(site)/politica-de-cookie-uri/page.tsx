import React from "react";

const data = [
  {
    title: "Ce sunt cookie-urile?",
    text: "Cookie-urile sunt fișiere text de mici dimensiuni, stocate pe dispozitivul dumneavoastră, care ne ajută să oferim o experiență mai bună pe site.",
    listOfItems: [],
  },
  {
    title: "Ce tipuri de cookie-uri folosim?",
    text: "",
    listOfItems: [
      "Cookie-uri esențiale – necesare pentru funcționarea corectă a site-ului și a formularului de contact.",
      "Cookie-uri de analiză – folosim Google Analytics pentru a colecta informații anonime despre modul în care vizitatorii folosesc site-ul (numărul de vizite, paginile accesate etc.).",
      "Cookie-uri pentru comentarii – dacă lăsați comentarii la articole, pot fi salvate preferințele dumneavoastră (nume, e-mail) pentru comentarii viitoare.",
    ],
  },
  {
    title: "Ce date colectăm prin cookie-uri?",
    text: "Cookie-urile nu stochează direct date personale sensibile, dar pot colecta date precum adresa IP sau identificatori de sesiune.",
    listOfItems: [],
  },
  {
    title: "Cum puteți controla cookie-urile?",
    text: "Puteți seta browserul să refuze toate sau doar anumite cookie-uri. Mai multe detalii găsiți în setările browserului dumneavoastră.",
    listOfItems: [],
  },
  {
    title: "Actualizări",
    text: "Ne rezervăm dreptul de a actualiza această politică ori de câte ori este necesar. Orice modificare va fi publicată pe această pagină.",
    listOfItems: [],
  },
];

export default function PoliticaDeCoockieuri() {
  return (
    <div className="w-full pt-16 px-2 mb-15 mx-auto sm:w-4/5 lg:w-4xl ">
      <div className="flex flex-col gap-10 mt-10">
        <h2 className="text-white text-2xl text-center">
          Politica de cookie-uri
        </h2>
        <div className=" bg-white rounded-2xl">
          <ol className="list-none list-inside text-black p-8 space-y-4 marker:font-bold flex flex-col gap-3">
            {data?.map((item, index) => {
              return (
                <li key={index} className="flex flex-col gap-3">
                  <h3>{item.title}</h3>
                  {item.text ? <p>{item.text}</p> : null}
                  {item.listOfItems ? (
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      {item.listOfItems.map((textItem, index) => {
                        return (
                          <li key={index}>
                            <p>{textItem}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
