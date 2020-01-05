let data;

let canvasWidth = 1500;
let canvasHeight = 750;
let scaling = 8;
let rectWidth = 100;
let rectHeight = 150;

let circleArray = [100+400, 230+400, 350+400, 470+400, 600+400];
let drugArray = [75+400,210+400,330+400,430+400,550+400];
let rectArray = [50+400,180+400,300+400,420+400,550+400];

//let colorArray = ['orange','white','green'];
let colorArray = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)','rgba(0, 0, 255, 1)']
let offcolorArray = ['rgba(255, 0, 0, 0.25)', 'rgba(0, 255, 0, 0.25)','rgba(0, 0, 255, 0.25)']
let rArray = [];
let drugArrays = [];
let offset = 0;
let state = -1;
let colorAge = ['purple', 'yellow', 'red', 'blue']
let fileNames = ['marijuana_category.csv', 'cocaine_category.csv', 'heroin_category.csv', 'hallucinogen_category.csv', 'methamphetamine_category.csv']
let drugData = []
let graphVal = [200+400, 340, 400, 50]
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
  noStroke();

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

  for(i=0; i<5;i++){
    //write drug name below
    fill(0);
    text(data.get(i+1,'drug'),drugArray[i],280);

    // outer circle
    let c1 = color('magenta');
    fill(c1);
    t = log(data.get(i+1,'total_users')) *scaling;
    rArray[i] = t;
    circle(circleArray[i],70,t);

    // inner circle
    let c2 = color('white');
    fill(c2);
    r = log(data.get(i+1,'addicted_users')) *scaling;
    circle(circleArray[i],70,r);

    // draw rectangle
    let offset = 0;
    for(let k=0;k<3;k++) {
      let k1 = color(colorArray[k]);
      if(state>=0 && i!=state){
        k1 = color(offcolorArray[k]);
      }
      fill(k1);

      let height = category_data.get(i,k+1) * rectHeight
      rect(rectArray[i],110+offset, rectWidth, height);
      offset += height;
    }
  }

  // This is for tooltip
  for(let j=0; j<5;j++){
    fill(255)
    if((mouseX-circleArray[j])**2 +
       (mouseY-70)**2 <= (rArray[j]/2)**2) {
      rectDiv = createDiv(rect(circleArray[j] + 0.6*rArray[j] ,20,70,70));
    }
  }

  // fill the below rectangles
  if(state>=0){
    for(let cat=0;cat<=2;cat++) {
      let x = graphVal[0];
      let y = graphVal[1] + cat * 60
      fill(0);
      text(categoryArray[cat], x-150, y+graphVal[3]/2)
      for(let age=0;age<=3;age++) {
        let agecolor = color(colorAge[age]);
        fill(agecolor)

        // x += 0.25 * graphVal[2];
        
        let width = graphVal[2]*drugArrays[state][cat][age]
        rect(x,y,width,graphVal[3])
        x+=width
      }
    }
    
    //draw legend for bottom rectangles
    for (index = 0; index < colorAge.length; index++) { 
      fill(colorAge[index]);
      rect(rectArray[rectArray.length-1]+200, 330+50*index, 100, 30);
      fill(1);
      text(ageArray[index], rectArray[rectArray.length-1]+320, 350+50*index)
    }    
  }
  
  //draw legend for top rectangles
  for (index = 0; index < colorArray.length; index++) { 
    fill(colorArray[index]);
    rect(rectArray[rectArray.length-1]+200, 130+50*index, 100, 30);
    fill(1);
    text(categoryArray[index], rectArray[rectArray.length-1]+320, 150+50*index)
  }
  
}

function mouseClicked() {

  let onBox = false;
  for(let i=0;i<=4;i++) {
    if(mouseX > (rectArray[i]) &&
       mouseX < (rectArray[i] + rectWidth) &&
       mouseY > (100) &&
       mouseY < (100 + rectHeight)){

        state = i;
        cursor('grab');
        onBox = true;
        break;
     }
   }
  if(!onBox){
    state = -1;
    cursor(ARROW)
  }
}
