const {ClickNumber} = require("../../models");


const filterClickNumberByResident = (residentId,annee,mois,jour) => {
    console.log(annee,mois,jour)
    return ClickNumber.get().filter((clickData) => clickData.residentId == residentId
        && clickData.annee==annee
        && clickData.mois==mois
        && clickData.jour==jour)[0]
}

const filterClickNumberByDate = (residentId,date1,date2) => {
    console.log(date1,date2)
    return ClickNumber.get().filter((clickData) => isDuringTheTimePeriod(date1,date2,clickData))
}

const isDuringTheTimePeriod=(date1,date2,clickData)=>{
    date=new Date(clickData.annee,clickData.mois,clickData.jour)
    console.log(date)
    return(date>=date1&&date<=date2)
}

module.exports = {
    filterClickNumberByResident,
    filterClickNumberByDate
}
