const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
async function render(){
    console.log('start');
    const userResponse = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your Project Title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Provide detail description",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
            name: "installationProcess"
        },
        {
            type: "input",
            message: "Provide instructions for use.",
            name: "instruction"
        },
        {
            type: "input",
            message: "provide License name ",
            name: "licenseName"
        },
        {
            type: "input",
            message: "provide License url ",
            name: "licenseUrl"
        },
        {
            type: "input",
            message: "please enter git hub user names of the contributor.",
            name: "contributorUserName"
        },
        {
            type: "input",
            message: "Provide examples on how to run tests.",
            name: "tests"
        }
        ]);
        console.log(`start`);
        console.log(userResponse);
        const gitUsername = userResponse.username;
        const projectTitle = userResponse.projectTitle;
        const projectDescription = userResponse.projectDescription;
        const installationProcess = userResponse.installationProcess;
        const instruction = userResponse.instruction;
        // const instructionExample = userResponse.instructionExample;
        const licenseName = userResponse.licenseName;
        const licenseUrl = userResponse.licenseUrl;
        const contributorUserName = userResponse.contributorUserName;
        console.log(contributorUserName)
        const tests = userResponse.tests;


         axios.get(`https://api.github.com/users/${gitUsername}`).then(response => { console.log(response.data);
    gitResponse=response;
    
    const gitData = gitResponse.data;
    const gitName = gitData.login;
    const gitEmail = gitData.email;
    const gitlocation = gitData.location;
    const gitUrl = gitData.html_url;
    const gitProfileImage = gitData.avatar_url; 
    console.log(response)
     

    const contributorUserNameArr = contributorUserName.split(",");
    console.log(contributorUserNameArr);

  
    for (i=0; i<contributorUserNameArr.length; i++){
        var nextUserName = contributorUserNameArr[i]
            axios.get(`https://api.github.com/users/${nextUserName}`).then(response => {

            console.log(response)
            var gitContributorProfileImage = response.data.avatar_url;
            var gitContributorUrl = response.data.html_url;
            var gitContributorEmail = response.data.email;
            var resultContributor = resultContributor + (`\n <img src="${gitContributorProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorUserName}  GitHubLink: ${gitContributorUrl}`);
            var result = (`
            # ${projectTitle} 
            ${projectDescription}
            \n* [![GitHub tag](https://img.shields.io/github/tag/${gitUsername}/${projectTitle}.svg)](https://GitHub.com/${gitUsername}/${projectTitle}/tags/)
            \n* [Installation](#Installation)
            \n* [Instructions](#Instructions)
            \n* [License](#License)
            \n* [Contributor](#Contributor)
            \n* [Author](#Author)
            \n* [Tests](#Tests)
            ## Installation
            ${installationProcess}
            ## Instructions
            ${instruction}
           
            \`\`\`
            ## License 
            This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details
            ## Contributors
            ${resultContributor}
            ## Tests
            ${tests}
            ## Author 
            \n![ProfileImage](${gitProfileImage})
            \n**${gitName}**
            \nEmail: ${gitEmail}
            \nLocation:${gitlocation}
            \nGitHub: ${gitUrl}
            `)
            var writeResult = fs.writeFileSync(path.join(__dirname, '../readme-homework', 'readMe.md'), result )
            console.log("file generated....")
                });
            }
        });

}
    
    
    


    
      
     

        // const contributorUserNameArr = contributorUserName.split(",");
        // console.log(contributorUserNameArr);

        // var resultContributor;
        // for (i=0; i<contributorUserNameArr.length; i++){
        //     var nextUserName = contributorUserNameArr[i]
        //         axios.get(`https://api.github.com/users/${nextUserName}`).then(response => {

        //         console.log(response)
        //         var gitContributorProfileImage = response.data.avatar_url;
        //         var gitContributorUrl = response.data.html_url;
        //         var gitContributorEmail = response.data.email;
        //         var resultContributor = resultContributor + (`\n <img src="${gitContributorProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorUserName}  GitHubLink: ${gitContributorUrl}`);
                
            
        //     });
       
        // }
        // var result = (`
        // # ${projectTitle} 
        // ${projectDescription}
        // \n* [Installation](#Installation)
        // \n* [Instructions](#Instructions)
        // \n* [License](#License)
        // \n* [Contributor](#Contributor)
        // \n* [Author](#Author)
        // \n* [Tests](#Tests)
        // ## Installation
        // ${installationProcess}
        // ## Instructions
        // ${instruction}
       
        // \`\`\`
        // ## License 
        // This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details
        // ## Contributors
        // ${resultContributor}
        // ## Tests
        // ${tests}
        // ## Author 
        // \n![ProfileImage](${gitProfileImage})
        // \n**${gitName}**
        // \nEmail: ${gitEmail}
        // \nLocation:${gitlocation}
        // \nGitHub: ${gitUrl}
        // `)
        // var writeResult = fs.writeFileSync(path.join(__dirname, '../readme-homework', 'readMe.md'), result )
        // console.log("file generated....")
        //     }








render();