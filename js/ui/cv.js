
define([
    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",

    "json!data/apps.json",
    "json!data/education.json",
    "json!data/positions.json",
    "json!data/skills.json",

    "text!./templates/cv.html",
    "text!./templates/app.html",
    "text!./templates/education.html",
    "text!./templates/position.html",
    "text!./templates/skill.html"
], function (compose, BaseElement, TemplateElement,
    appsData, educationData, positionsData, skillsData,
    template, appTemplate, educationItemTemplate, positionTemplate, skillTemplate) {

        var AppItem = compose.element("cmc-app-item", TemplateElement, {
            templateString: appTemplate,
            set name(value) {
                this.nameNode.innerHTML = value;
            },
            set url(value) {
                this.linkNode.href = value;
            },
            set description(value) {
                this.descriptionNode.innerHTML = value;
            },
            set created(value) {
                this.createdNode.innerHTML = value;
            }
        });

        var Apps = compose.element("cmc-apps", BaseElement, {
            createdCallback: function () {
                this.inherited(arguments);
                this.style.display = "flex";
                appsData.forEach(function (app) { this.root.appendChild(new AppItem(app)); }, this);
            }
        });

        var EducationItem = compose.element("cmc-education-item", TemplateElement, {
            templateString: educationItemTemplate,
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

        var Educations = compose.element("cmc-educations", BaseElement, {
            createdCallback: function () {
                this.inherited(arguments);
                this.style.display = "block";
                educationData.forEach(function (ed) { this.root.appendChild(new EducationItem(ed)); }, this);
            }
        });

        var Position = compose.element("cmc-position", TemplateElement, {
            templateString: positionTemplate,
            set company(company) {
                this.companyNode.innerHTML = company.name;
            },
            set title(title) {
                this.titleNode.innerHTML = title;
            },
            set summary(summary) {
                this.summaryNode.innerHTML = summary;
            },
            set "start-date"(startDate) {
                this.startDateNode.innerHTML = startDate;
            },
            set "end-date"(endDate) {
                if (endDate) {
                    this.endDateNode.innerHTML = endDate;
                }
            },
            set "is-current"(isCurrent) {
                if (isCurrent) {
                    this.endDateNode.innerHTML = "Present";
                }
            }
        });

        var Positions = compose.element("cmc-positions", BaseElement, {
            createdCallback: function () {
                this.inherited(arguments);
                this.style.display = "block";
                positionsData.forEach(function (position) { this.root.appendChild(new Position(position)); }, this);
            }
        });

        var Skill = compose.element("cmc-skill", TemplateElement, {
            templateString: skillTemplate,
            set name(name) {
                this.nameNode.innerHTML = name;
            }
        });

        var Skills = compose.element("cmc-skills", BaseElement, {
            createdCallback: function () {
                this.inherited(arguments);
                this.style.display = "block";
                skillsData.forEach(function (skill) { this.root.appendChild(new Skill(skill)); }, this);
            }
        });

        return compose.element("cmc-cv", TemplateElement, {
            templateString: template
        });

    });
