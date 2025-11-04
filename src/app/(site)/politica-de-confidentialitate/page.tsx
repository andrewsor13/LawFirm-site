import React from "react";

const data = [
  {
    title: "Cine suntem",
    text: "Acest site este operat de Avocat, cu sediul în [Adresă], email de contact: examplemail@mail.com",
    listOfItems: [],
  },
  {
    title: "Ce date colectăm",
    text: "Colectăm date personale doar atunci când utilizatorii aleg să ni le ofere:",
    listOfItems: [
      "Formular de contact: nume, prenume, număr de telefon, adresă de email, precum și orice documente încărcate voluntar.",
      "Comentarii la articole: numele ales de utilizator și mesajul scris.",
      "Date de utilizare: folosim Google Analytics pentru a obține informații statistice anonimizate despre vizitatori (ex: pagini vizitate, durata vizitei, locație aproximativă).",
    ],
  },
  {
    title: " Scopul colectării datelor",
    text: "Datele sunt colectate și prelucrate pentru:",
    listOfItems: [
      "Comunicarea cu dumneavoastră și soluționarea cererilor transmise prin formularul de contact.",
      "Evaluarea documentelor transmise pentru a înțelege mai bine situația juridică prezentată.",
      "Publicarea comentariilor pe blog (după aprobare).",
      "Îmbunătățirea funcționalității și conținutului site-ului prin analiză statistică.",
    ],
  },
  {
    title: "Temeiul legal",
    text: "Temeiurile legale sunt:",
    listOfItems: [
      "Consimțământul dumneavoastră (art. 6 alin. (1) lit. a GDPR).",
      "Interesul legitim de a răspunde solicitărilor și de a administra comentariile (art. 6 alin. (1) lit. f GDPR).",
      "Obligații legale și interese profesionale.",
    ],
  },
  {
    title: "Cine are acces la date",
    text: "Datele nu sunt vândute terților. Pot fi partajate doar cu:",
    listOfItems: [
      "Furnizorii de servicii necesare pentru funcționarea site-ului (ex: găzduire, servicii IT).",
      "Autoritățile competente, doar dacă legea o impune.",
    ],
  },
  {
    title: "Cât timp păstrăm datele",
    text: "",
    listOfItems: [
      "Datele din formularul de contact și documentele încărcate se păstrează pe durata necesară soluționării cererii și ulterior conform obligațiilor legale.",
      "Comentariile aprobate rămân publice până la solicitarea ștergerii.",
      "Datele statistice sunt păstrate conform politicilor Google Analytics.",
    ],
  },
  {
    title: "Drepturile utilizatorilor",
    text: "Aveți dreptul de a solicita:",
    listOfItems: [
      "Acces la datele personale.",
      "Rectificarea sau ștergerea datelor.",
      "Restricționarea prelucrării.",
      "Portabilitatea datelor.",
      "Retragerea consimțământului.",
      "Depunerea unei plângeri la ANSPDCP.",
    ],
  },
  {
    title: "Securitatea datelor",
    text: "Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele împotriva accesului neautorizat, modificării, divulgării sau distrugerii.",
    listOfItems: [],
  },
  {
    title: "Cookie-uri și Google Analytics",
    text: "Site-ul folosește cookie-uri și Google Analytics. Pentru mai multe detalii consultați Politica de Cookie-uri.",
    listOfItems: [],
  },
  {
    title: "Contact",
    text: "Pentru orice întrebări privind protecția datelor personale, ne puteți contacta la: gogolos.alexandra@gmail.com, 0731072676",
    listOfItems: [],
  },
];

export default function PoliticaDeConfidentialitate() {
  return (
    <div className="w-full pt-16 px-2 mx-auto mb-15 sm:w-4/5 lg:w-4xl ">
      <div className="flex flex-col gap-10 mt-10">
        <h2 className="text-white text-2xl text-center">
          Politica de confidențialitate
        </h2>
        <div className=" bg-white rounded-2xl">
          <ol className="list-none list-inside text-black p-8 space-y-4 marker:font-bold flex flex-col gap-3">
            {data?.map((item, index) => {
              return (
                <li key={index} className="flex flex-col gap-3">
                  <h3>
                    <span>{index + 1}.</span> {item.title}
                  </h3>
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
