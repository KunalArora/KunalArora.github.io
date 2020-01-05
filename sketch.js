let data;
let scaling = 8;
let rectWidth = 100;
let rectHeight = 150;
let circleArray = [100, 230, 350, 470, 600];
let drugArray = [75,210,330,430,550];
let rectArray = [50,180,300,420,550];
let colorArray = ['orange','white','green'];
let rArray = [];
let drugArrays = [];
let offset = 0;
let state = -1;
let colorAge = ['purple', 'yellow', 'red', 'blue']
let fileNames = ['marijuana_category.csv', 'cocaine_category.csv', 'heroin_category.csv', 'hallucinogen_category.csv', 'methamphetamine_category.csv']
let drugData = []
let graphVal = [100, 300, 400, 50]

function preload() {
  data = loadTable('data/real_data.csv','csv','header')
  category_data = loadTable('data/real_categorydata.csv','csv','header')

  for(let drug=0;  drug<=4;drug++){
    drugData[drug] = loadTable('data/'+fileNames[drug], 'csv', 'header')
  }
}


function setup() {
  createCanvas(1000, 1000);
  textSize(14);

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
    fill(255);
    text(data.get(i+1,'drug'),drugArray[i],274);

    let c1 = color('magenta');
    fill(c1);
    t = log(data.get(i+1,'total_users')) *scaling;
    circle(circleArray[i],70,t);

    let c2 = color('white');
    fill(c2);
    r = log(data.get(i+1,'addicted_users')) *scaling;
    rArray[i] = r;
    circle(circleArray[i],70,r);

    rect(rectArray[i],110,rectWidth,rectHeight);
    let offset = 0;
    for(let k=0;k<3;k++) {
      let k1 = color(colorArray[k]);
      fill(k1)
      let height = category_data.get(i,k+1) * rectHeight
      rect(rectArray[i],110+offset, rectWidth, height);
      offset += height;
    }
  }

  // This is for tooltip
  for(let j=0; j<5;j++){
    fill(255)
    if(((mouseX-circleArray[j])**2) +
       ((mouseY-70)**2) <= rArray[j]**2) {
      rectDiv = createDiv(rect(circleArray[j] + 30,20,70,70));
    }
  }

  if(state>=0){
    for(let cat=0;cat<=2;cat++) {
      let x = graphVal[0];
      for(let age=0;age<=3;age++) {
        let agecolor = color(colorAge[age]);
        fill(agecolor)

        // x += 0.25 * graphVal[2];
        let y = graphVal[1] + cat * 60
        let width = graphVal[2]*drugArrays[state][cat][age]
        rect(x,y,width,graphVal[3])
        x+=width
      }
    }
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
