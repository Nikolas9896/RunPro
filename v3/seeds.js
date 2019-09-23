var mongoose        = require("mongoose"),
    Race            = require("./models/race");
var data = [
        {
            name:"Uzhhorod Half Marathon 2019",
            image: "https://runstyle.net/wp-content/uploads/2019/04/UHM2019_1200.jpg",
            description: "Друзі, запрошуємо всіх на Uzhhorod Half Marathon 2019, що відбудеться 29 вересня 2019 року. На Вас чекає напівмарафонська дистанція (21,097 км), 10-ти кілометрова дистанція та напівмарафонська естафета, а також дитячі забіги для наймолодших. Траса Змагань буде прокладена по м. Ужгород. Покриття траси: асфальт, бруківка."
        },
        {
            name:"UnionRun 2019",
            image: "https://runstyle.net/wp-content/uploads/2019/08/unionrunbanner1200_500-1200x480.jpg",
            description: "Union Run - 4-а спортивна подія, що активізує бігові емоції, особисті досягнення та враження якими хочеться ділитись. Union Run - 700 участників. Біжи разом з легкоатлетами, аматорами бігу, активними спортивними людьми, проведи свій час у веселій компанії та дружній сім‘ї."
        },
        {
            name:"Wizz Air Kyiv City Marathon 2019",
            image: "https://runstyle.net/wp-content/uploads/2018/11/cropped-Wizz-Air-Kyiv-City-Marathon-2018-logo-01-260x260.png",
            description: "\"Wizz Air Kyiv City Marathon 2019\" проводиться з метою популяризації та пропаганди бігових масових заходів в Україні, а також: - популяризації та пропаганди здорового способу життя; - розвитку масового спорту; - інтеграції України у світовий біговий марафонський рух; - інформування, плекання та мотивування української аудиторії, допомоги в досягненні нею особистих і спортивних цілей, стимулювання росту спортивних досягнень у широких масах населення України."
        },
        {
            name:"Wizz Air Kyiv City Marathon 2019",
            image: "https://runstyle.net/wp-content/uploads/2019/09/Smart_run_500-260x260.jpg",
            description: "ВПЕРШЕ НА ТЕРЕНАХ УКРАЇНИ! Думали-гадали і все ж вирішили зробити забіг на трамплін для стрибків на лижах К30 у м. Кременці Унікальна подія, яка випробує твій характер на міць. Унікальна спортивна споруда. Унікальні перші учасники. Це все SMART RUN Запрошуємо творити історію разом!!!"
        },
        {
            name:"Львів Нова Пошта напівмарафон 2019",
            image: "https://runstyle.net/wp-content/uploads/2018/12/np-260x260.png",
            description: "Нова пошта Львів! Змагання Всесвітнього масштабу."
        }
];
function seedDB(){
    //REMOVE ALL RACES
    Race.remove({}, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log("===DELETE RACES!===");
        //ADD a FEW RACES
        data.forEach((seed) => {
        Race.create(seed, (err, data) => {
            if(err){
                console.log(err);
            } else {
                console.log("added a race");
            }
        });
    });
        }
    });
    
}

module.exports = seedDB;