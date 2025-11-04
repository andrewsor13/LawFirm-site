import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiPoliceOfficerHead, GiFamilyTree } from "react-icons/gi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { FaGavel, FaBalanceScale, FaHandshake } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";

const domains = [
  {
    title: "Întocmire contracte civile",
    slug: "intocmire-contracte-civile",
    icon: HiOutlineClipboardDocumentList,
    description:
      "Redactăm contracte civile profesioniste, personalizate pentru fiecare client. Asigurăm claritate, legalitate și protecție juridică pentru afacerea sau tranzacțiile tale.",
    detailedDescription: `Oferim servicii complete de întocmire a contractelor civile, inclusiv contracte de vânzare-cumpărare, închirieri, împrumuturi sau colaborări comerciale. Fiecare contract este verificat atent pentru a preveni eventuale litigii și pentru a proteja interesele clientului. Serviciile noastre sunt ideale pentru persoane fizice și juridice care doresc siguranță juridică și claritate în relațiile contractuale.`,
    imagePath: "/images/contract_image.jpg",
    question:
      "De ce este important să apelezi la un avocat pentru întocmirea contractelor civile?",
    paragraphs: [
      "Un contract civil bine redactat reprezintă baza unei colaborări sigure și echilibrate între părți. Ca avocat specializat în drept civil, mă asigur că fiecare document juridic este clar, legal și oferă protecție completă pentru interesele clientului. Prin analizarea atentă a fiecărei clauze și adaptarea contractului la situația concretă, previn apariția litigiilor costisitoare și ofer garanția unor relații contractuale corecte și sigure.",

      "Ofer servicii complete de redactare, analiză și negociere a contractelor civile și comerciale, inclusiv: contracte de vânzare-cumpărare, contracte de închiriere, contracte de împrumut, contracte de credit bancar sau linie de credit, contracte de garanție, ipotecă și gaj, contracte de muncă și negociere de contracte colective, contracte de confidențialitate, acorduri de parteneriat, contracte de cesiune de creanță, contracte de mandat și multe altele. Fiecare document este personalizat pentru a reflecta corect intențiile părților și pentru a reduce la minimum riscurile juridice.",

      "Pe lângă redactare, asigur consultanță detaliată privind revizuirea contractelor, interpretarea clauzelor complexe și evaluarea riscurilor contractuale. În fiecare colaborare, obiectivul meu este să protejez interesele clientului, să identific punctele vulnerabile și să ofer soluții eficiente pentru a evita conflictele. Astfel, clienții mei beneficiază nu doar de documente juridice bine structurate, ci și de siguranța unei protecții legale complete, indiferent dacă sunt persoane fizice sau companii.",
    ],
    services: [
      "Redactare contracte civile",
      "Analiză contracte",
      "Negociere clauze contractuale",
      "Consultanță juridică personalizată",
    ],
  },
  {
    title: "Drept Penal",
    slug: "drept-penal",
    icon: GiPoliceOfficerHead,
    description:
      "Asistență juridică completă în cauze penale, cu strategii eficiente și apărare fermă pentru protejarea drepturilor tale în fața instanțelor și autorităților.",
    detailedDescription: `Oferim consultanță și reprezentare în toate tipurile de dosare penale, de la infracțiuni minore până la cauze complexe. Analizăm în detaliu probele, construim strategii de apărare personalizate și reprezentăm clienții în fața poliției, procuraturii și instanțelor. Scopul nostru este să protejăm drepturile fundamentale ale clientului, să reducem riscurile și să obținem cele mai bune soluții legale.`,
    imagePath: "/images/police_car_image.jpg",
    question:
      "De ce este esențial să apelezi la un avocat specializat în drept penal?",
    paragraphs: [
      "Într-un dosar penal, fiecare detaliu contează și poate influența decisiv rezultatul. Ca avocat specializat în drept penal, analizez probele cu atenție, identific vulnerabilitățile acuzării și construiesc o strategie adaptată situației tale. Fie că ești suspect, inculpat sau persoană vătămată, obiectivul meu este să îți apăr drepturile și să mă asigur că procesul se desfășoară corect, transparent și conform legii.",
      "Experiența acumulată în cauze penale îmi permite să gestionez atât infracțiuni minore, cât și dosare complexe, cum ar fi fraude financiare, infracțiuni violente, trafic de droguri sau infracțiuni economice. Ofer asistență încă din faza de urmărire penală, particip la audieri și formulez cereri și apărări care pot schimba cursul procesului. În fiecare caz, urmăresc să ofer clientului cele mai bune șanse prin argumente solide și o apărare profesionistă.",
      "Un proces penal nu aduce doar consecințe juridice, ci poate afecta profund viața personală, cariera și reputația. Din acest motiv, tratez fiecare caz cu maximă responsabilitate și discreție. Scopul meu este să obțin o soluție favorabilă – fie achitare, fie reducerea pedepsei sau soluționarea amiabilă, atunci când legea permite. Alegând un avocat de drept penal, ai alături un profesionist care îți apără libertatea, interesele și drepturile fundamentale.",
    ],
    services: [
      "Consultanță penală",
      "Reprezentare în instanță",
      "Apărare în faza de urmărire penală",
      "Negociere și soluționare amiabilă",
      "Evaluarea probelor și strategie de apărare",
    ],
  },
  {
    title: "Dreptul Muncii",
    slug: "dreptul-muncii",
    icon: MdOutlineWorkOutline,
    description:
      "Consultanță și reprezentare juridică completă pentru angajați și angajatori. Gestionăm conflicte de muncă și oferim soluții eficiente pentru protecția drepturilor în relațiile de muncă.",
    detailedDescription: `Oferim servicii specializate de consultanță și reprezentare în dreptul muncii, acoperind contracte individuale și colective de muncă, concedieri, ore suplimentare, discriminare, hărțuire și conflicte colective. Ne asigurăm că toate procedurile respectă legislația muncii și că drepturile angajaților și angajatorilor sunt protejate. Serviciile noastre sunt ideale pentru firme și persoane fizice care doresc claritate, siguranță juridică și soluții rapide în relațiile de muncă.`,
    imagePath: "/images/handshake_office.jpg",
    question: "Cum îți asiguri protecția drepturilor în relațiile de muncă?",
    paragraphs: [
      "Legislația muncii este complexă și poate fi greu de navigat atât pentru angajați, cât și pentru angajatori. Ca avocat specializat în dreptul muncii, ofer consultanță și reprezentare în toate aspectele raporturilor de muncă: contracte individuale și colective, concedieri, ore suplimentare, discriminare sau hărțuire. Rolul meu este să clarific procedurile legale și să protejez drepturile fiecărei părți implicate.",
      "Gestionarea corectă a unui conflict de muncă este esențială pentru prevenirea pierderilor financiare și reputaționale. Analizez cu atenție fiecare situație, formulez strategii juridice personalizate și reprezint clienții în negocieri sau în fața instanțelor. Obiectivul meu este să obțin soluții eficiente și echilibrate, care să protejeze atât interesele angajaților, cât și ale angajatorilor.",
      "Serviciile mele includ redactarea și verificarea contractelor de muncă, elaborarea regulamentelor interne, asistență în inspecțiile autorităților și reprezentare în fața instituțiilor competente, precum Inspectoratul Teritorial de Muncă sau Consiliul Național pentru Combaterea Discriminării. Astfel, fiecare client beneficiază de protecție juridică solidă și de certitudinea că toate relațiile de muncă respectă legislația în vigoare.",
    ],
    services: [
      "Consultanță pentru angajați și angajatori",
      "Redactarea și verificarea contractelor de muncă",
      "Gestionarea conflictelor de muncă",
      "Reprezentare în fața instanțelor și instituțiilor de control",
      "Evaluarea riscurilor juridice și elaborarea regulamentelor interne",
    ],
  },
  {
    title: "Consultanță Generală",
    slug: "consultanta-generala",
    icon: BsPeopleFill,
    description:
      "Soluții juridice clare și personalizate pentru orice problemă legală. Oferim îndrumare pentru decizii sigure și protecție împotriva riscurilor legale.",
    detailedDescription: `Oferim consultanță juridică completă pentru probleme diverse, de la aspecte contractuale și civile, până la reglementări complexe și prevenirea litigiilor. Serviciile noastre includ analiza situațiilor juridice, recomandări practice și strategii adaptate nevoilor fiecărui client. Ideal pentru persoane fizice și companii care doresc să ia decizii informate și să evite riscurile legale.`,
    imagePath: "/images/general_consulting.jpg",
    question: "De ce este importantă consultanța juridică?",
    paragraphs: [
      "Consultanța juridică generală este fundamentul deciziilor corecte și sigure, atât în plan personal, cât și profesional. Ca avocat, ofer analize clare și personalizate, astfel încât clienții să înțeleagă opțiunile disponibile și riscurile fiecărei decizii. Acest sprijin previne erorile costisitoare și litigiile viitoare.",
      "Serviciile de consultanță acoperă aspecte contractuale, reglementări legale, drept civil și comercial, oferind o imagine completă asupra situației. Construiesc strategii eficiente și recomandări practice, adaptate obiectivelor clientului, pentru ca fiecare decizie să fie solid fundamentată și sigură.",
      "Principalul beneficiu al consultanței juridice este prevenția problemelor. Colaborez strâns cu clienții pentru a oferi ghidaj constant și protecție juridică în fața situațiilor neprevăzute, astfel încât deciziile luate să fie informate, sigure și orientate spre rezultate durabile.",
    ],
    services: [
      "Analiza situațiilor juridice",
      "Recomandări și strategii personalizate",
      "Consultanță pentru persoane fizice și companii",
      "Prevenirea litigiilor și protecția juridică",
      "Îndrumare în luarea deciziilor legale",
    ],
  },
  {
    title: "Drept funciar, retrocedări, exproprieri",
    slug: "drept-funciar-retrocedari-exproprieri",
    icon: FaGavel,
    description:
      "Protejăm dreptul tău de proprietate prin consultanță și reprezentare în retrocedări, revendicări și exproprieri. Asistență juridică completă pentru terenuri și imobile.",
    detailedDescription: `Oferim asistență juridică completă în domeniul dreptului funciar, retrocedărilor și exproprierilor. Analizăm documentația proprietății și istoricul legal, reprezentăm clienții în negocieri sau instanță și asigurăm respectarea legislației. Serviciile noastre garantează protecția drepturilor proprietarilor și soluții favorabile pentru recuperarea sau compensarea terenurilor și imobilelor.`,
    imagePath: "/images/harta_teren.jpg",
    question:
      "De ce este esențial sprijinul unui avocat în retrocedări și exproprieri?",
    paragraphs: [
      "Dreptul funciar implică numeroase reglementări privind proprietatea, retrocedările și exproprierile. Persoanele se confruntă adesea cu dificultăți birocratice, documentație incompletă sau conflicte juridice de lungă durată. Ca avocat, ofer o abordare clară și soluții eficiente pentru apărarea dreptului de proprietate și obținerea rezultatelor favorabile pentru clienți.",
      "În cazurile de retrocedare, analizez cu atenție actele și istoricul juridic al proprietății pentru a demonstra dreptul legitim al clientului în fața instanțelor sau autorităților. În situațiile de expropriere, mă asigur că procedurile sunt legale și că despăgubirile sunt corecte și proporționale cu valoarea reală a bunului, protejând astfel clientul împotriva eventualelor abuzuri.",
      "Un avocat specializat nu oferă doar consultanță și reprezentare, ci și prevenție, prin identificarea riscurilor și adoptarea celor mai bune strategii legale. Prin profesionalism și orientare către rezultate, transformăm situațiile complexe în soluții clare, oferind clienților stabilitate și siguranță juridică în problemele legate de proprietate.",
    ],
    services: [
      "Consultanță pentru proprietate și terenuri",
      "Reprezentare în retrocedări și revendicări",
      "Asistență în exproprieri și despăgubiri",
      "Analiza documentației și istoricului legal",
      "Negocieri și reprezentare în instanță",
    ],
  },
  {
    title: "Drept Bancar",
    slug: "drept-bancar",
    icon: RiBankLine,
    description:
      "Consultanță și reprezentare în relațiile cu instituțiile bancare. Gestionăm credite, executări silite, litigii și negocieri contractuale pentru protejarea intereselor tale financiare.",
    detailedDescription: `Oferim servicii complete în drept bancar și financiar, inclusiv consultanță pentru credite, contracte bancare, executări silite și litigii. Reprezentăm clienții în fața instituțiilor financiare, negociem condiții contractuale și asigurăm protecția drepturilor financiare. Ideal pentru persoane fizice și juridice care doresc siguranță și echilibru în relația cu băncile.`,
    imagePath: "/images/credit_contract.jpg",
    question: "Cum te poate sprijini un avocat specializat în drept bancar?",
    paragraphs: [
      "Relația cu instituțiile bancare poate fi adesea complicată, mai ales în cazul problemelor legate de credite, contracte sau executări silite. Ca avocat specializat în drept bancar, apăr interesele clienților în fața băncilor și mă asigur că drepturile lor sunt respectate. Analizez atent fiecare document, clauză și procedură pentru a identifica eventualele nereguli și a oferi soluții legale eficiente.",
      "În situațiile de executări silite sau clauze abuzive în contractele de credit, intervin prin contestarea acestora și construirea unei apărări solide în instanță. Ofer, de asemenea, sprijin în negocieri cu băncile pentru obținerea unor condiții mai avantajoase și evitarea pierderilor financiare. Scopul este de a asigura echilibrul între client și instituția financiară, într-un domeniu unde deseori puterea este inegală.",
      "Experiența în litigii bancare permite identificarea celor mai bune soluții, fie că este vorba de restructurarea datoriilor, anularea unor clauze contractuale sau recuperarea sumelor plătite nedrept. Astfel, fiecare client beneficiază de protecție juridică reală, siguranță în deciziile financiare și liniștea că interesele sale sunt apărate profesional și eficient.",
    ],
    services: [
      "Consultanță pentru contracte bancare și credite",
      "Reprezentare în litigii și executări silite",
      "Identificarea și contestarea clauzelor abuzive",
      "Negocieri cu instituțiile financiare",
      "Protecția drepturilor financiare ale clienților",
    ],
  },
  {
    title: "Dreptul Familiei și Succesiuni",
    slug: "dreptul-familiei-si-succesiuni",
    icon: GiFamilyTree,
    description:
      "Sprijin legal pentru probleme de familie și succesiuni. Consultanță în divorțuri, partaje, custodie, adopții și moșteniri, cu protecția intereselor tuturor părților.",
    detailedDescription: `Oferim consultanță și reprezentare juridică în domeniul familiei și succesiunilor, acoperind divorțuri, partaje, custodie, adopții și moșteniri. Asigurăm respectarea drepturilor membrilor familiei și desfășurarea echitabilă a proceselor, reducând conflictele și stresul. Serviciile noastre sunt concepute pentru a proteja interesele tuturor părților implicate.`,
    imagePath: "/images/group_handshake.jpg",
    question:
      "Cum te poate sprijini un avocat în probleme de familie și succesiuni?",
    paragraphs: [
      "Litigiile de familie, precum divorțurile, custodia copiilor sau partajul bunurilor, sunt printre cele mai sensibile situații juridice. Ca avocat specializat în dreptul familiei, ofer sprijin empatic, dar ferm, pentru a proteja interesele clienților și pentru a găsi soluții echitabile. Obiectivul meu este să reduc impactul emoțional și să transform un proces dificil într-un parcurs cât mai clar și corect.",
      "În ceea ce privește succesiunile, sprijin clienții în redactarea testamentelor, gestionarea moștenirilor și soluționarea disputelor dintre moștenitori. Mă asigur că drepturile fiecărei părți sunt respectate, patrimoniul este împărțit conform legii și eventualele conflicte sunt gestionate eficient. Experiența mea ajută clienții să evite blocajele și să finalizeze procedurile într-un mod legal și avantajos.",
      "Prin consultanță preventivă, ajut familiile să prevină conflictele juridice, fie prin redactarea unor documente clare, fie prin mediere atunci când tensiunile escaladează. Astfel, clienții câștigă siguranță juridică și liniște sufletească, știind că deciziile luate sunt corecte și protejează viitorul lor și al celor dragi. În toate cazurile, scopul meu este să găsesc echilibrul între legalitate, corectitudine și interesele reale ale familiei.",
    ],
    services: [
      "Consultanță și reprezentare în divorțuri și partaje",
      "Asistență în custodia și tutela copiilor",
      "Mediere și soluționarea disputelor familiale",
      "Redactarea testamentelor și administrarea moștenirilor",
      "Protecția drepturilor și intereselor tuturor părților implicate",
    ],
  },
  {
    title: "Drept Civil",
    slug: "drept-civil",
    icon: FaBalanceScale,
    description:
      "Consultanță și reprezentare în probleme civile. Soluții legale eficiente pentru litigii, conflicte și protecția drepturilor persoanelor fizice și juridice.",
    detailedDescription: `Oferim servicii complete de drept civil, inclusiv reprezentare în litigii între persoane fizice, juridice sau comerciale. Asigurăm protecția drepturilor clienților, soluționarea eficientă a conflictelor și consiliere pentru prevenirea disputelor viitoare. Serviciile noastre sunt ideale pentru persoane și companii care doresc siguranță juridică și soluții eficiente.`,
    imagePath: "/images/civil_law.jpg",
    question:
      "De ce este important sprijinul unui avocat în probleme de drept civil?",
    paragraphs: [
      "Dreptul civil reprezintă fundamentul relațiilor juridice dintre persoane fizice și juridice. De la litigii privind contracte și obligații, până la conflicte legate de proprietate sau răspundere civilă, un avocat specializat oferă claritate și soluții eficiente. Rolul meu este să transform un cadru legal complex într-un proces transparent, astfel încât fiecare client să își poată apăra corect drepturile.",
      "Mă ocup de redactarea și analiza documentelor juridice, ofer consultanță în cazurile de litigii civile și reprezint clienții în instanță pentru a obține cele mai bune rezultate. Fie că este vorba de conflicte patrimoniale, executări silite sau neînțelegeri contractuale, acționez cu profesionalism și strategie pentru a proteja interesele celor pe care îi reprezint.",
      "Prin abordarea preventivă, ajut clienții să evite conflictele viitoare prin identificarea riscurilor juridice și găsirea unor soluții echilibrate înainte ca acestea să devină litigii. Astfel, persoanele fizice și companiile pot beneficia de stabilitate juridică, siguranță în tranzacții și încredere că fiecare pas făcut respectă cadrul legal. Dreptul civil, gestionat corect, oferă echilibru și protecție pe termen lung.",
    ],
    services: [
      "Consultanță și reprezentare în litigii civile",
      "Redactarea și analiza documentelor juridice",
      "Protecția drepturilor persoanelor fizice și juridice",
      "Prevenirea și soluționarea conflictelor patrimoniale",
      "Asistență în executări silite și neînțelegeri contractuale",
    ],
  },
  {
    title: "Dreptul Asigurărilor",
    slug: "dreptul-asigurarilor",
    icon: FaHandshake,
    description:
      "Consultanță și reprezentare în relația cu companiile de asigurări. Obținem despăgubiri corecte și gestionăm litigiile pentru protejarea drepturilor tale.",
    detailedDescription: `Oferim consultanță completă și reprezentare în domeniul asigurărilor, inclusiv pentru daune, despăgubiri și litigii. Evaluăm cererile de despăgubire, negociem sumele corecte și reprezentăm clienții în instanță sau în negocieri cu companiile de asigurări. Serviciile noastre ajută clienții să obțină compensațiile meritate și să fie protejați în relațiile cu asiguratorii.`,
    imagePath: "/images/insurance_handshake.jpg",
    question: "Cum te poate ajuta un avocat în domeniul asigurărilor?",
    paragraphs: [
      "Domeniul asigurărilor este adesea complicat, plin de clauze greu de înțeles și proceduri care pot deveni împovărătoare pentru client. În astfel de situații, rolul meu ca avocat este să ofer claritate și să protejez interesele clienților atunci când se confruntă cu daune, accidente sau refuzuri nejustificate de plată din partea companiilor de asigurări.",
      "Ofer consultanță juridică pentru redactarea și interpretarea contractelor de asigurare, dar și pentru soluționarea disputelor apărute între asigurați și societățile de asigurări. Intervin pentru a mă asigura că despăgubirile acordate sunt corecte și proporționale cu prejudiciile suferite, negociind direct cu companiile de asigurări sau reprezentând clienții în instanță atunci când este necesar.",
      "Experiența mea în acest domeniu îmi permite să identific rapid clauzele abuzive și să construiesc o strategie eficientă pentru apărarea drepturilor asiguratului. Astfel, clienții beneficiază de o protecție juridică reală și de siguranța că își vor recupera sumele datorate, indiferent de complexitatea cazului sau de tacticile utilizate de societățile de asigurări.",
    ],
    services: [
      "Consultanță pentru redactarea și interpretarea contractelor de asigurare",
      "Evaluarea cererilor de despăgubire și negocierea sumelor corecte",
      "Reprezentare în instanță în caz de litigii cu societățile de asigurări",
      "Identificarea și contestarea clauzelor abuzive",
      "Asistență în daune, accidente și refuzuri nejustificate de plată",
    ],
  },
];

export default domains;
