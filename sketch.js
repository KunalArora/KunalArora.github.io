let data;
let drug_name;

let canvasWidth = 1500;
let canvasHeight = 750;
let scaling = 6;
let rectWidth = 100;
let rectHeight = 150;

let circleArray = [100+400, 230+400, 350+400, 470+400, 600+400];
let drugArray = [75+400,210+400,330+400,430+400,550+400];
let rectArray = [50+400,180+400,300+400,420+400,550+400];
let toplegend = [265, 315, 365]

//let colorArray = ['orange','white','green'];
// let colorArray = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)','rgba(0, 0, 255, 1)']

let colorArray = ['#FFE4B5','#B0C4DE','#FFB6C1']

let rArray = [];
let drugArrays = [];
let offset = 0;
let state = -1;
let colorAge = ['purple', 'yellow', 'red', 'blue']
let fileNames = ['marijuana_category.csv', 'cocaine_category.csv', 'heroin_category.csv', 'hallucinogen_category.csv', 'methamphetamine_category.csv']
let drugData = []
let graphVal = [200+400, 400+150, 400, 50]
let categoryArray = ['Crime', 'Mental Health', 'Unemployment']
let ageArray = ['18-25 years', '26-34 years','35-49 years', '50+ years']

function preload() {
  data = loadTable('data/real_data.csv','csv','header')
  category_data = loadTable('data/real_categorydata.csv','csv','header')

  for(let drug=0;  drug<=4;drug++){
    drugData[drug] = loadTable('data/'+fileNames[drug], 'csv', 'header')
  }
}


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textSize(14);
  frameRate(60);



  for(let drug=0;drug<=4;drug++) {
      drugArrays[drug] = [];
      for(let cat=0;cat<=2;cat++){
        drugArrays[drug][cat]=[]
        for(let age=0;age<=3;age++) {
          drugArrays[drug][cat][age] = drugData[drug].get(cat, age+1)
        }
      }
  }
}

function draw() {
  background(200);
  // noStroke();

  textSize(50)
  text('Drug Addiction Statistics in the US for 2017', 430, 70)
  textSize(14);

  for(i=0; i<5;i++){

    let drug = data.get(i+1, 'drug')
    let drug_users = data.get(i+1,'total_users')
    let drug_addicts = data.get(i+1,'addicted_users')
    let addicted_to_total = round((drug_addicts/drug_users) * 100)

    //write drug name below
    fill(0);
    text(drug,drugArray[i],400);

    // outer circle
    let c1 = color('#008000');
    fill(c1);
    t = (log(drug_users)) * scaling;
    rArray[i] = t;
    circle(circleArray[i],190,t);

    // inner circle
    let c2 = color('white');
    fill(c2);
    //r = addicted_to_total;
    r = t*((drug_addicts/drug_users) **0.5);
    circle(circleArray[i],190,r);

    // draw rectangles
    let offset = 0;
    for(let k=0;k<3;k++) {
      let k1 = color(colorArray[k]);
      let k2 = color('black');
      if(state>=0 && i!=state){
        k1.setAlpha(100);
        k2.setAlpha(100);
      }
      fill(k1);

      let height = category_data.get(i,k+1) * rectHeight

      rect(rectArray[i],230+offset, rectWidth, height);

      fill(k2);
      text(round(100*category_data.get(i,k+1))+'%', rectArray[i]+0.35*rectWidth, 230+offset + 0.67*height);
      offset += height;
    }
  }

  // This is for tooltip
  for(let j=0; j<5;j++){

    let drug_users = data.get(j+1,'total_users')
    let drug_addicts = data.get(j+1,'addicted_users')
    let addicted_to_total = round((drug_addicts/drug_users) * 100)

    if((mouseX-circleArray[j])**2 +
       (mouseY-190)**2 <= (rArray[j]/2)**2) {
      fill(255);
      rectDiv = createDiv(rect(circleArray[j] + 0.6*rArray[j] ,110,130,90));
      fill(1);
      text(('Drug: ' + data.get(j+1,'drug')), circleArray[j] + 0.6*rArray[j] + 5,125);
      text(('# drug users: ' + drug_users), circleArray[j] + 0.6*rArray[j] + 5,145);
      text(('# drug addicts: ' + drug_addicts), circleArray[j] + 0.6*rArray[j] + 5,165);
      text(('% of addicts: ' + addicted_to_total + '%'), circleArray[j] + 0.6*rArray[j] + 5,185);
    }
  }

  // fill the below rectangles
  if(state>=0){
    drawingContext.setLineDash([10, 25])
    line(390,450,1400,450)
    drawingContext.setLineDash([])

    textSize(20);
    text(drug_name + ' addiction statistics on specific population demographies', 450, 500)
    textSize(14);

    for(let cat=0;cat<=2;cat++) {
      let x = graphVal[0];
      let y = graphVal[1] + cat * 60
      fill(0);
      text(categoryArray[cat], x-150, y+graphVal[3]/2)
      for(let age=0;age<=3;age++) {
        let agecolor = color(colorAge[age]);
        agecolor.setAlpha(200);
        fill(agecolor)

        let width = graphVal[2]*drugArrays[state][cat][age]
        rect(x,y,width,graphVal[3])
        if(drugArrays[state][cat][age]>0.05){
          fill(1);
          text(round(100*drugArrays[state][cat][age])+'%', x+0.35*width, y + 0.67*graphVal[3]);
        }
        x+=width
      }
    }

    //draw legend for bottom rectangles
    for (index = 0; index < colorAge.length; index++) {
      fill(colorAge[index]);
      rect(rectArray[rectArray.length-1]+200, 550+50*index, 100, 30);
      fill(1);
      text(ageArray[index], rectArray[rectArray.length-1]+320, 568+50*index)
    }
  }

  //draw legend for top rectangles
  for (index = 0; index < colorArray.length; index++) {
    stroke(colorArray[index]);
    drawingContext.setLineDash([10, 5]);
    line(1180, toplegend[index], 1250, toplegend[index]);
    drawingContext.setLineDash([]);
    // rect(rectArray[rectArray.length-1]+200, 250+50*index, 100, 30);
    stroke(0)
    fill(1);
    text(categoryArray[index], rectArray[rectArray.length-1]+320, 270+50*index)
  }

  // outer circle
    let c1 = color('#008000');
    fill(c1);
    circle(circleArray[circleArray.length-1]+180,190,50);

    // inner circle
    let c2 = color('white');
    fill(c2);
    circle(circleArray[circleArray.length-1]+180,190,25);

    stroke(1);
    fill(1);
    line(circleArray[circleArray.length-1]+180, 170, circleArray[circleArray.length-1]+220, 170);
    text('Number of drug users', circleArray[circleArray.length-1]+225, 175);
    line(circleArray[circleArray.length-1]+180, 195, circleArray[circleArray.length-1]+220, 195);
    text('Number of drug addicts', circleArray[circleArray.length-1]+225, 200);
}

function mouseClicked() {

  let onBox = false;
  for(let i=0;i<=4;i++) {
    if(mouseX > (rectArray[i]) &&
       mouseX < (rectArray[i] + rectWidth) &&
       mouseY > (220) &&
       mouseY < (220 + rectHeight)){

        state = i;
        cursor('grab');
        onBox = true;
        drug_name = data.get(i+1, 'drug')
        break;
     }
   }
  if(!onBox){
    state = -1;
    cursor(ARROW)
    drug_name= ''
  }
}
