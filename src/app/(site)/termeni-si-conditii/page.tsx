import React from "react";

const terms_and_conditions = [
  {
    title: "Acceptarea termenilor",
    content:
      "Folosirea acestui site implică acceptarea termenilor și condițiilor prezentate mai jos. Operatorul site-ului își rezervă dreptul de a modifica aceste prevederi fără o notificare prealabilă. Continuarea utilizării serviciilor reprezintă acordul dumneavoastră asupra modificărilor.",
  },
  {
    title: "Corectitudinea informațiilor furnizate",
    content:
      "Informațiile pe care ni le transmiteți (nume, email, telefon, documente etc.) trebuie să fie corecte și actuale. Folosirea unor date false sau incomplete poate împiedica posibilitatea de a vă contacta sau de a vă oferi un răspuns relevant.",
  },
  {
    title: "Domeniul de aplicare",
    content:
      "Termenii și condițiile se aplică tuturor utilizatorilor site-ului. Acesta poate conține link-uri către alte website-uri, care nu se află sub controlul nostru. Nu ne asumăm responsabilitatea pentru conținutul sau termenii de utilizare ai acestor site-uri externe.",
  },
  {
    title: "Drepturi de proprietate intelectuală",
    content:
      "Accesul pe acest website este gratuit și limitat la utilizare în scop personal și informativ. Conținutul (texte, imagini, documente, articole de blog) este protejat prin drepturi de autor și nu poate fi copiat, modificat, reprodus sau utilizat în scopuri comerciale fără acordul scris al proprietarului.",
  },
  {
    title: "Date cu caracter personal și documente transmise",
    content:
      "Conform Regulamentului (UE) 679/2016 (GDPR) și Legii 190/2018: Datele colectate (nume, email, telefon, mesaj, documente încărcate) sunt prelucrate în scopul de a răspunde solicitărilor dumneavoastră și de a vă putea contacta. Documentele juridice pe care le transmiteți prin intermediul site-ului sunt confidențiale și utilizate exclusiv pentru analiza situației prezentate. Aveți dreptul de acces, rectificare, ștergere („dreptul de a fi uitat”), restricționarea prelucrării, portabilitatea datelor și dreptul de opoziție. Pentru exercitarea acestor drepturi ne puteți contacta la adresa de email: avocat@dozadeinformatie.ro.",
  },
  {
    title: "Newsletter și comunicări",
    content:
      "Optând pentru abonarea la newsletter, vă exprimați acordul să primim și să prelucrăm adresa de email pentru transmiterea periodică de informații. Vă puteți dezabona oricând accesând link-ul din email.",
  },
  {
    title: "Limitarea răspunderii",
    content:
      "Informațiile publicate pe acest site și pe blog au un caracter strict informativ și nu constituie consultanță juridică personalizată. Pentru o opinie juridică adaptată situației dumneavoastră este necesar să apelați direct la serviciile avocatului. Deși depunem eforturi pentru a oferi informații corecte și actualizate, nu garantăm lipsa erorilor sau completitudinea conținutului publicat.",
  },
  {
    title: "Cookies și tehnologii similare",
    content:
      "Site-ul poate folosi cookies pentru a îmbunătăți experiența utilizatorilor și pentru analiză statistică (ex. Google Analytics). Puteți seta browserul să blocheze sau să șteargă cookies, însă acest lucru poate afecta funcționalitatea site-ului.",
  },
  {
    title: "Dispoziții finale",
    content:
      "Acest site se adresează tuturor categoriilor de vârstă. Prin utilizarea lui, confirmați că ați citit și ați înțeles termenii și condițiile de utilizare și sunteți de acord cu respectarea acestora.",
  },
];

export default function Termeni_Si_Conditii() {
  return (
    <div className="w-full py-16 px-2 mx-auto sm:w-4/5 lg:w-4xl ">
      <div className="flex flex-col gap-10 mt-10">
        <h2 className="text-white text-2xl text-center">Termeni și condiții</h2>
        <div className=" bg-white rounded-2xl p-4">
          <ol className="list-none text-black list-inside p-3 space-y-6">
            {terms_and_conditions?.map((item, index) => (
              <li key={index}>
                <p className="font-bold text-base mb-1">
                  {index + 1}. {item.title}
                </p>
                <p className="text-black text-sm leading-relaxed text-justify">
                  {item.content}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
