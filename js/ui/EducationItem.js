
define([
    "compose",
    "layout/TemplateElement",
    "text!./templates/EducationItem.html"
], function (compose, TemplateElement, template) {

    return compose.element("cmc-education-item", TemplateElement, {
        templateString: template,
        set "school-name"(schoolName) {
            this.schoolNameNode.innerHTML = schoolName;
        },
        set "field-of-study"(fieldOfStudy) {
            this.fieldOfStudyNode.innerHTML = fieldOfStudy;
        },
        set "start-date"(startDate) {
            this.startDateNode.innerHTML = startDate;
        },
        set "end-date"(endDate) {
            this.endDateNode.innerHTML = endDate;
        },
        set degree(degree) {
            this.degreeNode.innerHTML = degree;
        }
    });

});
