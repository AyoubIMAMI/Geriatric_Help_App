const {ClickData} = require("../../models");


/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterClicksByResident = (residentId) => {
    return ClickData.get().filter((clickData) => clickData.residentId == residentId)
}


module.exports = {
    filterClicksByResident
}
