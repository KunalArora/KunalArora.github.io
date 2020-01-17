let affected_rect_height
let total_data;
let drug_Data;
let affected_data;
let drug_data = [];
let drug_age_data = [];
let drug_name;
let hover_position = [];
let drugArrays = []; // 3-dimentional array for plotting venn diagram
let drugAgeArray = [];
let age_chart_state = -1;
let drawCrosses = false
let main_toggle_state = 0;
let v3_toggle_state = 0;
let drug;
let drug_users;
let drug_addicts;
let addicted_to_total;
let k1
let hover_position_x = [];
let hover_position_y = [];
let hover_diameter = [];

let canvasWidth = 1450;
let canvasHeight = 900;
let total_circle_scaling = 6;
// let rect_scaling = 0.5;

// Position
let total_n_addicted_circle_position = [600, 835, 490, 728, 965];
let total_n_addicted_y_position = 255;
let drug_name_position = 570;
let age_legend_rect_position = [400,540,680,820,960];
let age_chart_rectangle_position = [200+400, 400+150, 400, 50]
let main_toggle_x_position = [150,300,450]
let main_toggle_y_position = 110;
let v2_toggle_x_position = 400;
let v2_toggle_y_position = 200;
let category_venn_position = 600;
let category_venn_y_position = 700;
let v3_toggle_x_position = 260;
let v3_toggle_y_position = 230;
let drug_toggle_offset = 130;
let v3_drug_venn_x_position = 350
let v3_drug_venn_y_position = 400
let v1_bar_chart_x_position = 250
let v1_bar_chart_y_position = 450
let v1_drug_name_x_scaling = [60,76,48,32,43]
let v1_pie_x_position = 1100
let v1_pie_y_position = 310
let v1_pie_data_x_position = [-60,70,80,10,-60]
let v1_pie_data_y_position = [-70,-70,30,70,30]
let v1_pie_chart_legend_x_position = 1020
let v1_pie_chart_legend_y_position = 430
let v1_bar_chart_legend_x_position = 1000;
let v1_bar_chart_legend_y_position = 680;
let v1_bar_chart_axis_value_position = [250,310,350,410,460,530, 630,800, 940]
let v1_bar_chart_axis_value=[0,128,256,512,1024,2048,4096,8192,11000]


// Color
let background_color = 'white'
let age_chart_color = ['hsla(195, 93%, 30%, 0.60)', 'hsla(195, 93%, 30%, 0.40)', 'hsla(195, 93%, 30%, 0.20)', 'hsla(195, 93%, 30%, 0.05)']
let venn_chart_color = ['#fed9a6', '#ccebc5','#b3cde3'];
let venn_total_circle_color = '#EA6B6B';
let v2_affected_rect_color = 'hsla(217, 25%, 40%, 0.75)';
let pie_chart_color = ['#8dd3c7',
'#ffffb3','#bebada','#fb8072','#80b1d3']
let v1_bar_chart_color=['#80cdc1', '#dfc27d']
let default_color = 'hsla(0, 0%, 0%, 0.75)'


//Legends
let age_chart_category = ['Criminal', 'Mentally ill', 'Unemployed']
let age_below_chart_category = ['Addicted users', 'All users']
let age_legend = ['18-25 years', '26-34 years','35-49 years', '50+ years']
let pie_chart_legend = ["12-17", "18-25", "26-34", "35-49", "50+"]

let drugCategoryFileNames = ['marijuana_category_all.csv', 'hallucinogen_category_all.csv', 'cocaine_category_all.csv', 'methamphetamine_category_all.csv', 'heroin_category_all.csv']
let drugAgeFileNames = ['marijuana_age.csv',  'hallucinogen_age.csv', 'cocaine_age.csv', 'methamphetamine_age.csv', 'heroin_age.csv']
function preload() {
  drug_Data = loadTable('data/drug_data.csv', 'csv','header')

  affected_data = loadTable('data/ellipse_data.csv', 'csv', 'header')
  total_ellipse_data = loadTable('data/ellipse_data_all.csv', 'csv', 'header')

  total_age_data = loadTable('data/total_age_data.csv', 'csv', 'header')

  for(let drug=0;  drug<=4;drug++){
    drug_data[drug] = loadTable('data/'+drugCategoryFileNames[drug], 'csv', 'header')
  }

  for(let drug=0;  drug<=4;drug++){
    drug_age_data[drug] = loadTable('data/'+drugAgeFileNames[drug], 'csv', 'header')
  }
}


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textSize(14);
  frameRate(60);
  textFont('sans-serif');

  for(let drug=0;drug<=4;drug++) {
      drugArrays[drug] = [];
      for(let cat=0;cat<=2;cat++){
        drugArrays[drug][cat]=[]
        for(let age=0;age<=3;age++) {
          drugArrays[drug][cat][age] = drug_data[drug].get(cat, age+1)
        }
      }
  }
  for(let drug=0;drug<=4;drug++) {
      drugAgeArray[drug] = [];
      for(let cat=0;cat<=2;cat++){
        drugAgeArray[drug][cat]=[]
        for(let age=0;age<=3;age++) {
          drugAgeArray[drug][cat][age] = drug_age_data[drug].get(cat, age+1)/100
        }
      }
  }
}

function draw() {
  background(background_color);

  // print(drug_age_data)
  stroke(100)
  line(100,0,100,canvasHeight);
  line(canvasWidth-100,0,canvasWidth-100,canvasHeight);
  textSize(30)
  line(110,90,canvasWidth-110,90)
  line(110, canvasHeight-100, canvasWidth-110, canvasHeight-100)
  stroke(0)
  strokeWeight(0.2)
  fill(default_color)
  text('Illicit Drug Addiction Statistics in the US for 2017', 120, 50)
  textSize(15)
  fill('hsla(0, 0%, 0%, 1)')
  text('Explore drug usage statistics on different social-demographic categories or population-age demographies', 120, 80)

  k1= color('hsla(221, 100%, 40%, 1)')
  for(let i=0; i<=2;i++){
    if(main_toggle_state!=i){
      k1.setAlpha(50)
    }
    else{
      k1.setAlpha(200)
    }
    fill(k1)
    rect(main_toggle_x_position[i], main_toggle_y_position, 150, 40,5)
    fill(default_color)
    textSize(16)
    // fill(255)
    text('Overall statistics', 172,135)
    text('Social analysis', 325, 135)
    text('Age-wise analysis', 465, 135)
    textSize(14)
  if(mouseX>main_toggle_x_position[i]&&mouseX<main_toggle_x_position[i]+40&&mouseY>main_toggle_y_position&&mouseY<main_toggle_y_position+5){
    cursor('grab')
     } else {
     cursor(ARROW)
     }
  }

  if(main_toggle_state==0) {
    overall_statistics();
  } else if(main_toggle_state==1){
    category_wise_statistics();
  }else if(main_toggle_state==2){
    age_wise_statistics();
  }
}

function overall_statistics() {

  textSize(24)
  text('Analysed data of 56000 users from the US Drug Usage Survey* of 2017', 160, 240)
  textSize(18)
  text('Number of drug users(used atleast 3 times in the past year) reported \n              as well as the fraction of all users who are addicted \n                       is displayed for the 5 most common drugs', 250, 320)
  fill(0)
  textSize(12)
  text("* National Survey on Drug Use and Health (NSDUH),",130,830)
  textSize(11)
  text("a major source of statistical information on illicit drugs and on mental health issues of the US civilians, population aged 12 or older",418, 830)
  textSize(14)

  line(v1_bar_chart_x_position, v1_bar_chart_y_position+10, v1_bar_chart_x_position, v1_bar_chart_y_position+300)
  line(v1_bar_chart_x_position, v1_bar_chart_y_position+300, v1_bar_chart_x_position+700, v1_bar_chart_y_position+300)


  textSize(12)
  let scaling = 6.5
  let drug_name_y_scaling = 14
  for(let i=0; i<=4;i++){
    let total_users = drug_Data.get(i,"total_users");
    let addicted_users = drug_Data.get(i,"addicted_users")
    let drug_name = drug_Data.get(i,"drug")

    let total_width = round(sqrt(total_users))*scaling
    let addicted_width = total_width * (addicted_users/total_users)
    fill(v1_bar_chart_color[0])
    rect(v1_bar_chart_x_position, v1_bar_chart_y_position+((i+1)*50), round(total_width),30)
    fill(v1_bar_chart_color[1])
    rect(v1_bar_chart_x_position, v1_bar_chart_y_position+ ((i+1)*50), addicted_width,30)
    fill(0)
    text(round((addicted_users/total_users)*100)+"%", v1_bar_chart_x_position+(addicted_width+1), v1_bar_chart_y_position+((i+1)*54+drug_name_y_scaling))
    text(drug_name, v1_bar_chart_x_position-v1_drug_name_x_scaling[i], v1_bar_chart_y_position+(i+1)*54+drug_name_y_scaling)
    drug_name_y_scaling-=4
    }

  let offset = 2
  for(let i=0;i<=8;i++){
    text(v1_bar_chart_axis_value[i], v1_bar_chart_axis_value_position[i]-offset, v1_bar_chart_y_position+320)
    offset+=1
       line(v1_bar_chart_axis_value_position[i+1],v1_bar_chart_y_position+295, v1_bar_chart_axis_value_position[i+1],v1_bar_chart_y_position+305)
  }

  let total_users = int(total_age_data.get(0,"12-17"))+int(total_age_data.get(0,"18-25"))+int(total_age_data.get(0,"26-34"))+int(total_age_data.get(0,"35-49"))+int(total_age_data.get(0,"50+"))

  let angles=[round(int(total_age_data.get(0,"12-17"))/total_users*100), round(int(total_age_data.get(0,"18-25"))/total_users*100), round(int(total_age_data.get(0,"26-34"))/total_users*100), round(int(total_age_data.get(0,"35-49"))/total_users*100), round(int(total_age_data.get(0,"50+"))/total_users*100)]

  //legend for pie chart
  textSize(16)
  text('Age-wise distribution of total users', v1_pie_chart_legend_x_position-45, v1_pie_chart_legend_y_position-260)
  pieChart(250,angles)
  textSize(12)
  for(let i=0;i<=4;i++){
    fill(pie_chart_color[i])
    rect(v1_pie_chart_legend_x_position+(i*70)-70,v1_pie_chart_legend_y_position+15,10,10)
    fill(0)
    text(pie_chart_legend[i],v1_pie_chart_legend_x_position+(i*70)-56, v1_pie_chart_legend_y_position+24)
  }

  //legend for bar chart
  text('# of Drug and Addicted users for different illicit drugs', v1_bar_chart_x_position+160,v1_bar_chart_y_position+35)
  for(let i=0;i<=1;i++){
    fill(v1_bar_chart_color[i])
    rect(v1_bar_chart_legend_x_position, v1_bar_chart_legend_y_position+20,140-(i*80),20)
  }
  fill(0)
  line(965,580,985,570)
  line(965,580,985,590)
  line(965,580,1050,580)
  line(1050,580,1050, 600)
  text("The graph is plotted on a square \nroot scale to normalize the data", 1000, 610)

  line(v1_bar_chart_legend_x_position,v1_bar_chart_legend_y_position+60,v1_bar_chart_legend_x_position+140,v1_bar_chart_legend_y_position+60)
  line(v1_bar_chart_legend_x_position,v1_bar_chart_legend_y_position+45,v1_bar_chart_legend_x_position,v1_bar_chart_legend_y_position+60)
  line(v1_bar_chart_legend_x_position+140,v1_bar_chart_legend_y_position+45,v1_bar_chart_legend_x_position+140,v1_bar_chart_legend_y_position+60)
  line(v1_bar_chart_legend_x_position,v1_bar_chart_legend_y_position,v1_bar_chart_legend_x_position+60,v1_bar_chart_legend_y_position)
  line(v1_bar_chart_legend_x_position,v1_bar_chart_legend_y_position,v1_bar_chart_legend_x_position,v1_bar_chart_legend_y_position+15)
  line(v1_bar_chart_legend_x_position+60,v1_bar_chart_legend_y_position,v1_bar_chart_legend_x_position+60,v1_bar_chart_legend_y_position+15)

  text('# of drug users', v1_bar_chart_legend_x_position+30, v1_bar_chart_legend_y_position+75)
  text('# of addicted users', v1_bar_chart_legend_x_position, v1_bar_chart_legend_y_position-8)

  line(400,670,420,670)
  line(370,715,420,715)
  line(420,670,420,715)
  line(420,695,450,695)
  text('Most addictive drugs',455,699)
  line(720,540,720,570)
  line(720,540,710,550)
  line(720,540,730,550)
  text('Most # of drug users',675,580)

}

function pieChart(diameter, data) {
  var sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
  var range = 2.0 * PI / sum;
  var lastAngle = 0;
  for (let i = 0; i < data.length; i++) {
    let k = color(pie_chart_color[i])
    k.setAlpha(100)
    fill(k)
    arc(v1_pie_x_position, v1_pie_y_position, diameter, diameter, lastAngle, lastAngle += data[i] * range );
    fill(0)
    text(data[i]+"%",v1_pie_x_position-v1_pie_data_x_position[i], v1_pie_y_position-v1_pie_data_y_position[i])
  }
}

function category_wise_statistics() {

  fill(0)
  // text('Toggle me', v2_toggle_x_position-10, v2_toggle_y_position+35)
  fill('hsba(190, 100%, 50%,1)');
  let toggle_color = 'hsba(0, 100%, 50%)';
  text('Toggle me', v2_toggle_x_position-16, v2_toggle_y_position+35)
  rect(v2_toggle_x_position, v2_toggle_y_position, 50, 20,20);
  if(drawCrosses){
    fill(toggle_color);
    circle(v2_toggle_x_position+35, v2_toggle_y_position+10, 20)
  }else{
    fill(toggle_color);
    circle(v2_toggle_x_position+15, v2_toggle_y_position+10, 20)
  }

  fill(0);
  textSize(12)
  text("Number of total users for different social-demographic group is a combination of different fields in the dataset.", 120,818)
  text(" * Criminal: # of Violent Attacks + Stealing + Selling drugs",150, 840)
  text(" * Mentally Ill: Mental health + Depressive disorder", 150, 860)
  text("")
  textSize(14);
  for(i=0; i<5;i++){
    drug = drug_Data.get(i, 'drug')
    drug_users = drug_Data.get(i,'total_users')
    drug_addicts = drug_Data.get(i,'addicted_users')
    addicted_to_total = round((drug_addicts/drug_users) * 100)

    if(i<=1) {
    venn_x_position = category_venn_position;
    venn_y_position = category_venn_y_position;
    drug_name_x_position = drug_name_position;
    drug_name_y_position = 495;
    total_y_position = total_n_addicted_y_position;
  } else {
    venn_x_position = 10;
    venn_y_position = 1000;
    drug_name_x_position = -10;
    drug_name_y_position = 795;
    total_y_position = 560;
  }

    //write drug name below
    fill(0);
    text(drug,(drug_name_x_position+(i*240)),drug_name_y_position);

    // outer circle
    fill(color('white'));
    t = (drug_users**0.25) * total_circle_scaling;
    hover_position_x[i] = total_n_addicted_circle_position[i];
    hover_position_y[i] = total_y_position;
    hover_diameter[i] = t
    circle(total_n_addicted_circle_position[i],total_y_position,t);

    // inner circle
    fill(venn_total_circle_color );
    r = t*((drug_addicts/drug_users) **0.5);
    circle(total_n_addicted_circle_position[i],total_y_position,r);

  if(!drawCrosses){
      strokeWeight(0.01)
      fill('hsla(0, 0%, 35%, 1)')
      textSize(20)
      text('Drug users socio-demographic statistics', 550, 200)
      textSize(14)
      affected_rect_height = int(100*int(total_ellipse_data.get(i,'UNION'))/int(drug_Data.get(i,'total_users')))
      let k1 = color(venn_chart_color[0])
      k1.setAlpha(200)
      fill(k1);
      ellipse(venn_x_position+(i*240),(venn_y_position-350),120,120)
      let k2 = color(venn_chart_color[1])
      k2.setAlpha(200)
      fill(k2);
      ellipse((venn_x_position-40)+(i*240),(venn_y_position-280),120,120)
      let k3 = color(venn_chart_color[2])
      k3.setAlpha(200)
      fill(k3);
      ellipse((venn_x_position+40)+(i*240),(venn_y_position-280),120,120)
      strokeWeight(0.2)
      fill(0)

    let values = [total_ellipse_data.get(i,'crime'),
                  total_ellipse_data.get(i,'mental'),
                  total_ellipse_data.get(i,'unemployment'),
                  total_ellipse_data.get(i,'crime_mental'),
                  total_ellipse_data.get(i,'crime_unemployment'),
                  total_ellipse_data.get(i,'mental_unemployment'),
                  total_ellipse_data.get(i,'INTERSECTION')];
    let all_addict_data = total_ellipse_data.get(i,'ALL_ADDICTS');


    text(round(100*values[0]/all_addict_data)+"%",(venn_x_position-10)+(i*240),(venn_y_position-370))
      text(round(100*values[1]/all_addict_data)+"%",(venn_x_position-70)+(i*240),(venn_y_position-250))
      text(round(100*values[2]/all_addict_data)+"%",(venn_x_position+50)+(i*240),(venn_y_position-250))
      text(round(100*values[3]/all_addict_data)+"%",(venn_x_position-40)+(i*240),(venn_y_position-310))
      text(round(100*values[4]/all_addict_data)+"%",(venn_x_position+25)+(i*240),(venn_y_position-310))
      text(round(100*values[5]/all_addict_data)+"%",(venn_x_position-5)+(i*240),(venn_y_position-250))
      text(round(100*values[6]/all_addict_data)+"%",(venn_x_position-5)+(i*240),(venn_y_position-300))

    }
    else{
      strokeWeight(0.01)
      fill('hsla(0, 0%, 35%, 1)')
      textSize(20)
      text('Drug addicts socio-demographic statistics', 550, 200)
      textSize(14)
      affected_rect_height = int(100*int(drug_Data.get(i,'affected_users'))/int(drug_Data.get(i,'addicted_users')))
      let k1 = color(venn_chart_color[0])
      k1.setAlpha(200)
      fill(k1);
      ellipse(venn_x_position+(i*240),(venn_y_position-350),120,120)
      let k2 = color(venn_chart_color[1])
      k2.setAlpha(200)
      fill(k2);
      ellipse((venn_x_position-40)+(i*240),(venn_y_position-280),120,120)
      let k3 = color(venn_chart_color[2])
      k3.setAlpha(200)
      fill(k3);
      ellipse((venn_x_position+40)+(i*240),(venn_y_position-280),120,120)
      strokeWeight(0.2)

    let values = [affected_data.get(i,'crime'),
                  affected_data.get(i,'mental'),
                  affected_data.get(i,'unemployment'),
                  affected_data.get(i,'crime_mental'),
                  affected_data.get(i,'crime_unemployment'),
                  affected_data.get(i,'mental_unemployment'),
                  affected_data.get(i,'INTERSECTION')];
    let all_addict_data = affected_data.get(i,'ALL_ADDICTS');

      fill(0)
      text(round(100*values[0]/all_addict_data)+"%",(venn_x_position-10)+(i*240),(venn_y_position-370))
      text(round(100*values[1]/all_addict_data)+"%",(venn_x_position-70)+(i*240),(venn_y_position-250))
      text(round(100*values[2]/all_addict_data)+"%",(venn_x_position+50)+(i*240),(venn_y_position-250))
      text(round(100*values[3]/all_addict_data)+"%",(venn_x_position-40)+(i*240),(venn_y_position-310))
      text(round(100*values[4]/all_addict_data)+"%",(venn_x_position+25)+(i*240),(venn_y_position-310))
      text(round(100*values[5]/all_addict_data)+"%",(venn_x_position-5)+(i*240),(venn_y_position-250))
      text(round(100*values[6]/all_addict_data)+"%",(venn_x_position-5)+(i*240),(venn_y_position-300))
    }

    fill(v2_affected_rect_color)
    let scaling = 2
    rect((venn_x_position+110)+(i*240), (venn_y_position-220)-affected_rect_height*scaling,10, affected_rect_height*scaling);
    fill(0)
    text(round(affected_rect_height)+"%", (venn_x_position+107)+(i*240), (venn_y_position-affected_rect_height*scaling-225))
  }

  //legend
  let legend_circle_y_position = 600
  fill(venn_chart_color[0]);
  ellipse((i*230),legend_circle_y_position-70,50,50)
  fill(venn_chart_color[1]);
  ellipse(-20+(i*230),legend_circle_y_position-40,50,50)
  fill(venn_chart_color[2]);
  ellipse(20+(i*230),legend_circle_y_position-40,50,50)

  let legend_line_y_position = legend_circle_y_position-10
  line(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+180, legend_line_y_position-70, total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+250, legend_line_y_position-70)
    line(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+210, legend_line_y_position-30, total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+250, legend_line_y_position-30)
    line(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+165, legend_line_y_position+10, total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+250, legend_line_y_position+10)
    line(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+165, legend_line_y_position-20, total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+165, legend_line_y_position+10)
  fill(10)
  let legend_text_y_position = legend_circle_y_position-5
  text('Criminal', 1220, legend_text_y_position-70)
  text('Unemployed', 1220, legend_text_y_position-30)
  text('Mentally ill', 1220, legend_text_y_position+10)

    // legend for total users circle
    fill(color('white'));
 circle(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+150,legend_circle_y_position-200,50);

    // legend for addicted users circle
    fill(venn_total_circle_color);
 circle(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+150,legend_circle_y_position-200,25);

  fill(color('black'));
  line(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+135, legend_circle_y_position-210, total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+180, legend_circle_y_position-250);
    text('# of drug users on square root scale', total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+145, legend_circle_y_position-255);
    line(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+150, legend_circle_y_position-195, total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+180, legend_circle_y_position-175);
    text('Fraction of addicted drug users', total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+185, legend_circle_y_position-170);

  //legend for total affected users
  fill(v2_affected_rect_color)
  rect(total_n_addicted_circle_position[total_n_addicted_circle_position.length-1]+160, legend_circle_y_position+60,10,50)
  fill(0)
  line(1137,685,1200,685)
  text('% of affected users',1205,689)

  //Interaction hover
  let mouseOnBox = false;
  // This is for tooltip
  for(let j=0; j<5;j++){

    let drug_users = drug_Data.get(j,'total_users')
    let drug_addicts = drug_Data.get(j,'addicted_users')
    let addicted_to_total = round((drug_addicts/drug_users) * 100)

    //Interaction hover
    let mouseOnBox = false;

    // This is for tooltip
    for(let j=0; j<5;j++){

      let drug_users = drug_Data.get(j,'total_users')
      let drug_addicts = drug_Data.get(j,'addicted_users')
      let addicted_to_total = round((drug_addicts/drug_users) * 100)

      if((mouseX-hover_position_x[j])**2 +
         (mouseY-hover_position_y[j])**2 <= (hover_diameter[j]/2)**2) {
        mouseOnBox = true;
          fill('hsla(0, 0%, 66%, 0.05)');
          rect((total_n_addicted_circle_position[j]),(hover_position_y[j]-40),150,90,20);
          fill(1);
          text(('Drug: ' + drug_Data.get(j,'drug')), (total_n_addicted_circle_position[j])+15,(hover_position_y[j]-20));
          text(('# drug users: ' + drug_users), (total_n_addicted_circle_position[j]+15),(hover_position_y[j]));
          text(('# drug addicts: ' + drug_addicts), (total_n_addicted_circle_position[j]+15),(hover_position_y[j]+20));
          text(('% of addicts: ' + addicted_to_total + '%'), (total_n_addicted_circle_position[j]+15),(hover_position_y[j]+40));
      }
    }
  }

  if(drawCrosses){
    textSize(25)
    let start_y = 350
    let start_x = 130
    text('Conclusions', start_x,start_y-30)
    textSize(15)
    fill(100)
    text("* Marijuana addicts are less likely to be \n   criminals compared to other drugs", start_x, start_y+10);

    text("* Criminal-activity and mental illness tend to \n   co-occur together in drug addicts for all drugs", start_x, start_y+60);
    text("* Cocaine users and addicts are very different \n   in terms of socio-demographics",start_x,start_y+110)
    fill(0)
    text("Meth and heroin seem most dangerous because:",start_x,start_y+170)
    fill('hsla(0, 100%, 53%, 1)')
    text("- Addicted users are more socially damaged", start_x+20, start_y+190)
  text("- They are highly addictive", start_x+20, start_y+210)
  fill(0)
  }
  else{
    textSize(25)
    let start_y = 320
    let start_x = 130
    text("WHAT", start_x, start_y-30)
    textSize(15)
    text("Social-demographic analysis of drug users and drug \naddicts on three different aspects, criminal activities,\nmental health and unemployment",  start_x, start_y);
    textSize(13)
    fill('hsba(0, 100%, 50%,0.75)')
    text("Click on the toggle to view statistics for drug addicted users",  start_x, start_y+80);
    fill('hsla(0, 100%, 53%, 1)')
    textSize(20)
    text("Mental Health is a relevant social \n   issue among Marijuana users", start_x+30, 490);
    fill(0)
    //text("Overlap between criminals and mentally ill \nis higher compared to other overlaps for all drugs", 150, 450);
  }
}


function age_wise_statistics() {
  k1 = color('hsla(76, 100%, 29%, 1)')
  for(let i=0; i<=4;i++){
    if(v3_toggle_state!=i){
      k1.setAlpha(40)
    }
    else{
      k1.setAlpha(200)
    }
    fill(k1)
    rect(v3_toggle_x_position+(i*drug_toggle_offset), v3_toggle_y_position, drug_toggle_offset, 40,150)
  }
  fill(0)
  text('Marijuana', (v3_toggle_x_position+30), (v3_toggle_y_position+25))
  text('Hallucinogen', (v3_toggle_x_position+drug_toggle_offset+25), (v3_toggle_y_position+25))
  text('Cocaine', (v3_toggle_x_position+2*drug_toggle_offset+40), (v3_toggle_y_position+25))
  text('Meth', (v3_toggle_x_position+3*drug_toggle_offset+50), (v3_toggle_y_position+25))
  text('Heroin', (v3_toggle_x_position+4*drug_toggle_offset+40), (v3_toggle_y_position+25))

    drug = drug_Data.get(v3_toggle_state, 'drug')
    drug_users = drug_Data.get(v3_toggle_state,'total_users')
    drug_addicts = drug_Data.get(v3_toggle_state,'addicted_users')
    addicted_to_total = round((drug_addicts/drug_users) * 100)

    //write drug name below
    fill(0);
    // text(drug,(v3_drug_venn_x_position-35),(v3_drug_venn_y_position+310));

    // outer circle
    fill(color('white'));
    t = ((drug_users**0.25)) * total_circle_scaling;
    // hover_position[i] = t;
    circle(v3_drug_venn_x_position,v3_drug_venn_y_position,t);

    // inner circle
    fill(venn_total_circle_color);
    r = t*((drug_addicts/drug_users) **0.5);
    circle(v3_drug_venn_x_position,v3_drug_venn_y_position,r);

  let values = [total_ellipse_data.get(v3_toggle_state,'crime'),
                total_ellipse_data.get(v3_toggle_state,'mental'),
                total_ellipse_data.get(v3_toggle_state,'unemployment'),
                total_ellipse_data.get(v3_toggle_state,'crime_mental'),
                total_ellipse_data.get(v3_toggle_state,'crime_unemployment'),
                total_ellipse_data.get(v3_toggle_state,'mental_unemployment'),
                total_ellipse_data.get(v3_toggle_state,'INTERSECTION')];
    let all_addict_data = total_ellipse_data.get(v3_toggle_state,'ALL_ADDICTS')


    strokeWeight(0.01)
    let k4 = color(venn_chart_color[0])
    k4.setAlpha(200)
    fill(k4);
    ellipse(v3_drug_venn_x_position,(v3_drug_venn_y_position+120),150,150)
    let k5 = color(venn_chart_color[1])
    k5.setAlpha(200)
    fill(k5);
    ellipse((v3_drug_venn_x_position-40),(v3_drug_venn_y_position+210),150,150)
    let k6 = color(venn_chart_color[2])
    k6.setAlpha(200)
    fill(k6);
    ellipse((v3_drug_venn_x_position+40),(v3_drug_venn_y_position+210),150,150)
    strokeWeight(0.2)

    fill(0)
    text(round(100*values[0]/all_addict_data)+"%",(v3_drug_venn_x_position-10),(v3_drug_venn_y_position+90))
    text(round(100*values[1]/all_addict_data)+"%",(v3_drug_venn_x_position-90),(v3_drug_venn_y_position+ 240))
    text(round(100*values[2]/all_addict_data)+"%",(v3_drug_venn_x_position+70),(v3_drug_venn_y_position+ 240))
    text(round(100*values[3]/all_addict_data)+"%",(v3_drug_venn_x_position-50),(v3_drug_venn_y_position+ 160))
    text(round(100*values[4]/all_addict_data)+"%",(v3_drug_venn_x_position+35),(v3_drug_venn_y_position+ 160))
    text(round(100*values[5]/all_addict_data)+"%",(v3_drug_venn_x_position-10),(v3_drug_venn_y_position+ 240))
    text(round(100*values[6]/all_addict_data)+"%",(v3_drug_venn_x_position-10),(v3_drug_venn_y_position+ 180))

  colorMode(RGB, 255)

  text('Criminal', 230,480)
  text('Mentally ill', 170, 650)
  text('Unemployed', 450, 570)

  let age_chart_offset = 200;
  fill(0)
  textSize(18);
  // text(drug + ' addiction statistics on specific population age demographies', (v3_drug_venn_x_position+age_chart_offset), v3_drug_venn_y_position+310)

  textSize(14);
  line(v3_drug_venn_x_position+300,v3_drug_venn_y_position+20, v3_drug_venn_x_position+300, v3_drug_venn_y_position+160)
  for(let cat=0;cat<=2;cat++) {
    let x = (v3_drug_venn_x_position+250);
    let y = v3_drug_venn_y_position + 30 + cat * 40
    fill(0);
    text(age_chart_category[cat], x-50, y+25)
    for(let age=0;age<=3;age++) {
      fill(age_chart_color[age])

      let width = age_chart_rectangle_position[2]*drugArrays[v3_toggle_state][cat][age]
      rect(x+50,y+5,width,age_chart_rectangle_position[3]-20)
      if(drugArrays[v3_toggle_state][cat][age]>0.05){
        fill(1);
        text(round(100*drugArrays[v3_toggle_state][cat][age])+'%', x+45+0.35*width, y+25);
      }
      x+=width
    }
  }

  let x_offset = 70
  let width_offset = 0.9
  for(let cat=0;cat<=1;cat++) {
    let x = (v3_drug_venn_x_position+250);
    let y = v3_drug_venn_y_position + 200 + cat * 40
    fill(0);
    text(age_below_chart_category[cat], x-50, y+25)
    for(let age=0;age<=3;age++) {
      fill(age_chart_color[age])

      let width = age_chart_rectangle_position[2]*drugAgeArray[v3_toggle_state][cat][age]
      rect(x+x_offset,y+5,width_offset*width,age_chart_rectangle_position[3]-20)
      if(drugAgeArray[v3_toggle_state][cat][age]>0.05){
        fill(1);
        text(round(100*drugAgeArray[v3_toggle_state][cat][age])+'%', x+(x_offset-5)+0.35*(width*width_offset), y+25);
      }
      x+=width_offset*width
    }
    width_offset+=0.1
    x_offset-=20
  }

  //legend for age-group
  for (index = 0; index < age_chart_color.length; index++){

  fill(age_chart_color[index])
  rect(age_legend_rect_position[age_legend_rect_position.length-1]+180, 440+20*index, 60, 10);
    fill(1);
    text(age_legend[index], age_legend_rect_position[age_legend_rect_position.length-1]+250, 450+20*index)
    }

    textSize(25)
    text("Age-wise distribution of Social Problems in Drug Users", 270, 200)
    textSize(18)
    let v3_text_x = 450;
    let v3_text_y = 310;
    // text("Conclusions:", v3_text_x,v3_text_y-30)
    textSize(16)
    fill('hsla(0, 100%, 53%, 1)')
    text("  - Criminal drug users are most common at young age",v3_text_x+10,v3_text_y)
    text("  - Mentally ill drug users are less common at young age compared \n    to the criminals and unemployed", v3_text_x+10, v3_text_y+25);
    fill("red")

    v3_text_x = 350;
    v3_text_y = 330;
  if(v3_toggle_state==0){
      textSize(12)
      text("Addicts tend to be younger (18-25 years old) compared to all users", v3_text_x+320, v3_text_y+270);
      noFill()
      stroke("red")
      strokeWeight(1)
      rect(v3_text_x+366, v3_text_y+277, 70, 67)
    } else if (v3_toggle_state==1){
      text(" ", v3_text_x, v3_text_y);
    } else if (v3_toggle_state==2){
      textSize(12)
      text("Addicts are older (35+ years) compared to all users", v3_text_x+430, v3_text_y+270);
      noFill()
      stroke("red")
      strokeWeight(1)
      rect(v3_text_x+505, v3_text_y+277, 180, 67)
    } else if (v3_toggle_state==3){
      text("", v3_text_x, v3_text_y);
    } else if (v3_toggle_state==4){
      text(" ", v3_text_x, v3_text_y);
    }
}

function mouseClicked() {
  for(let i=0;i<=2;i++) {
    if(mouseX > main_toggle_x_position[i] &&
       mouseX < (main_toggle_x_position[i]+150) &&
       mouseY > main_toggle_y_position &&
       mouseY < (main_toggle_y_position + 40)){
      main_toggle_state = i;
      break;
    }
  }

  if(mouseX>=v2_toggle_x_position+10 && mouseX <= v2_toggle_x_position+20 && mouseY>=v2_toggle_y_position && mouseY<=v2_toggle_y_position+20){
      drawCrosses = false;
  }
  else if(mouseX>=v2_toggle_x_position+30 && mouseX <= v2_toggle_x_position+50 && mouseY>=v2_toggle_y_position && mouseY<=v2_toggle_y_position+20){
      drawCrosses = true;
  }

  for(let i=0;i<=4;i++){
    if(mouseX > (v3_toggle_x_position+(i*drug_toggle_offset)) &&
       mouseX < (v3_toggle_x_position+((i+1)*drug_toggle_offset)) &&
       mouseY > v3_toggle_y_position &&
       mouseY < (v3_toggle_y_position + 40)){
      v3_toggle_state=i;
      break;
    }
  }
}
