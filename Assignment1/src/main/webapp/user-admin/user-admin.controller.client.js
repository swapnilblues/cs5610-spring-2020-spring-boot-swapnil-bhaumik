(function () {
    let userService = new AdminUserServiceClient()
    let alice = {
        "username": "alice",
        "salary": "123",
        role: "FACULTY"
    }

    let users = [
        alice,
        {"username": "dan"},
        {"username": "frank"}
    ]
    users.push({
        username: "ed"
    })

    for (let u in users) {
        console.log(users[u])
    }

    let $student = $("<h1>Students</h1>")
    let $body = $("body")
    $body.append($student)
    let $userList = $("#userList")
    let $wbdv_tbody= $(".wbdv-tbody")
    let $table = $(".table")
    $userList.append("<li>dan</li>")

    let $ed = $("<li>")
    $ed.append("ed")
    $ed.append("<button>Delete</button>")
    $userList.append($ed)

    const deleteUser = (index) => {
        let user = users[index]
        let _id = user._id
        console.log(_id)
        userService.deleteUser(_id)
            .then(response => {
                users.splice(index, 1)
                renderUsers()})
    }

    let currentUser = -1
    const editUser = (index) => {
        const user = users[index];
        const _id = user._id;
        currentUser = index
        console.log(_id)
        userService.findUserById(_id)
            .then(user => { console.log(user)
                            $usernameFld.val(user.username)
    })

    }

    const renderUsers = () => {
        $userList.empty()
        $wbdv_tbody.empty()
        for (let u in users) {
            let $userLi = $(`<li> ${users[u].username} </li>`)

            let $deleteBtn = $("<button>Delete</button>")
            $deleteBtn.click(() => {
                deleteUser(u)
                console.log("ff",u)
            })

            let $deleteBtn1 = $("<button id='wbdv-remove' class='fa-2x fa fa-times wbdv-remove'></button>")
            $deleteBtn1.click(() => {
                deleteUser(u)
                console.log("ff",u)
            })

            let $editBtn = $("<button>Edit</button>")
            $editBtn.click(() => editUser(u)
            )
            $userLi.append($deleteBtn)
            $userLi.append($editBtn)
            $userList.append($userLi)

            $tr = $("<tr class='wbdv-template wbdv-user wbdv-hidden'>")
            $tr.append("<td class='wbdv-username'>" + users[u].username + "</td>")
            $tr.append("<td>*****</td>")
            $tr.append("<td>" + users[u].firstName + "</td>")
            $tr.append("<td>" + users[u].lastName + "</td>")
            $tr.append("<td>" + users[u].role + "</td>")
            $tr.append("<span class='float-right'>")
            $tr.append($deleteBtn1)
            $tr.append("<button id='wbdv-edit' class='fa-2x fa fa-pencil wbdv-edit'></button>")
            $tr.append("</span>")
            $tr.append("</td>")
            $tr.append("</tr>")
            $wbdv_tbody.append($tr)
        }
    }

const findAllUsers = () => {
    userService.findAllUsers()
        .then(remoteUsers => {
            users = remoteUsers
            renderUsers()
        })
}

findAllUsers()


    const createUser = () => {
        const user = {
            username : $usernameFld.val(),
            password : $passwordFld.val(),
            firstName : $firstNameFld.val(),
            lastName : $lastNameFld.val(),
            role : $roleFld.val()
        }
        $usernameFld1.val("")
        userService.createUser(user)
            .then(brandNewUser => {
                users.push(brandNewUser)
                console.log(users)
                renderUsers()
            })
    }

    const updateUser = () => {
        let user = users[currentUser]
        user.username = $usernameFld.val()

        $usernameFld.val("")
        userService.updateUser(user._id, user)
            .then(brandNewUser => {
                findAllUsers()
            })
    }


    let $createUserBtn = $(".wbdv-create")
    let $updateUserBtn = $("#updateUser")
    $createUserBtn.click(createUser)
    $updateUserBtn.click(updateUser)

    let $usernameFld1 = $("#usernameFld1")

    let $usernameFld = $("#usernameFld")
    let $passwordFld = $("#passwordFld")
    let $firstNameFld = $("#firstNameFld")
    let $lastNameFld = $("#lastNameFld")
    let $roleFld = $("#roleFld")

})

()