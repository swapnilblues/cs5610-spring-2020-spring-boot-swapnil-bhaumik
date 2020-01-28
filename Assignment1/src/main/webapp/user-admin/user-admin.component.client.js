(function () {
    let userService = new AdminUserServiceClient()
    let $deleteBtn1
    let $editBtn1
    let alice = {
        "username": "alice",
        "salary": "123",
        role: "FACULTY"
    }

    let users = []
    //     alice,
    //     {"username": "dan"},
    //     {"username": "frank"}
    // ]
    // users.push({
    //     username: "ed"
    // })

    // for (let u in users) {
    //     console.log(users[u])
    // }

    //let $student = $("<h1>Students</h1>")
    let $body = $("body")
    //$body.append($student)
    let $userList = $("#userList")
    let $wbdv_tbody= $(".wbdv-tbody")
  //  let $table = $(".table")
    $userList.append("<li>dan</li>")

    let $ed = $("<li>")
    $ed.append("ed")
    $ed.append("<button>Delete</button>")
    $userList.append($ed)

    function main() {

        const deleteUser = (index) => {
            let user = users[index]
            let _id = user._id
            console.log(_id)
            userService.deleteUser(_id)
                .then(response => {
                    users.splice(index, 1)
                    renderUsers(users)
                })
        }

        const findUserById = (id) => {
            return userService.findUserById(id)
        }

        let currentUser = -1
        const editUser = (index) => {
            const user = users[index];
            const _id = user._id;
            currentUser = index
            //console.log(_id)
            // console.log(user._id)
            // if(user.username !== "") {
                findUserById(_id)
                    .then(user => {
                        console.log(user)
                        $usernameFld.val(user.username)
                        $passwordFld.val(user.password)
                        $firstNameFld.val(user.firstName)
                        $lastNameFld.val(user.lastName)
                        $roleFld.val(user.role)
                    })
            // }
        }

        const renderUsers = (users) => {
            $userList.empty()
            $wbdv_tbody.empty()

            for (let u in users) {

                // renderUser(u)

                // let $userLi = $(`<li> ${users[u].username} </li>`)
                //
                // let $deleteBtn = $("<button>Delete</button>")
                // $deleteBtn.click(() => {
                //     deleteUser(u)
                //     //console.log("ff",u)
                // })

                $deleteBtn1 = $("<button id='wbdv-remove' class='fa-2x fa fa-times wbdv-remove'></button>")
                $deleteBtn1.click(() => {
                    deleteUser(u)
                    // console.log("ff",u)
                })

                // let $editBtn = $("<button>Edit</button>")
                // $editBtn.click(() => editUser(u)
                // )

                $editBtn1 = $("<button id='wbdv-edit' class='fa-2x fa fa-pencil wbdv-edit'></button>")
                $editBtn1.click(() => editUser(u)
                )
                // $userLi.append($deleteBtn)
                // $userLi.append($editBtn)
                // $userList.append($userLi)

                renderUser(users[u])

            }
        }

        const renderUser = (user) => {
            let $tr = $("<tr class='wbdv-template wbdv-user wbdv-hidden'>")
            $tr.append("<td class='wbdv-username'>" + user.username + "</td>")
            $tr.append("<td></td>")
            $tr.append("<td>" + user.firstName + "</td>")
            $tr.append("<td>" + user.lastName + "</td>")
            $tr.append("<td>" + user.role + "</td>")
            $tr.append("<span class='float-right'>")
            $tr.append($deleteBtn1)
            $tr.append($editBtn1)
            $tr.append("</span>")
            $tr.append("</td>")
            $tr.append("</tr>")
            $wbdv_tbody.append($tr)
        }
        const findAllUsers = () => {
            userService.findAllUsers()
                .then(remoteUsers => {
                    users = remoteUsers
                    renderUsers(users)
                })
        }

        findAllUsers()


        const createUser = () => {
            const user = {
                username: $usernameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstNameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val()
            }
            $usernameFld.val("")
            $passwordFld.val("")
            $lastNameFld.val("")
            $firstNameFld.val("")
            $roleFld.val("")
            if(user.username !== "") {
                userService.createUser(user)
                    .then(brandNewUser => {
                        users.push(brandNewUser)
                        console.log(users)
                        renderUsers(users)
                    })
            }
        }

        const updateUser = (users) => {
            let user = users[currentUser]
            user.username = $usernameFld.val()
            user.password = $passwordFld.val()
            user.firstName = $firstNameFld.val()
            user.lastName = $lastNameFld.val()
            user.role = $roleFld.val()

            $usernameFld.val("")
            $passwordFld.val("")
            $lastNameFld.val("")
            $firstNameFld.val("")
            $roleFld.val("")

            //console.log("dd",user.username)
            if(user.username !== "") {
                userService.updateUser(user._id, user)
                    .then(brandNewUser => {
                        findAllUsers()
                    })
            }
        }


        let $createUserBtn = $(".wbdv-create")
        let $updateUserBtn = $(".wbdv-update")
        $createUserBtn.click(createUser)
        $updateUserBtn.click(() => updateUser(users))

        let $usernameFld1 = $("#usernameFld1")

        let $usernameFld = $("#usernameFld")
        let $passwordFld = $("#passwordFld")
        let $firstNameFld = $("#firstNameFld")
        let $lastNameFld = $("#lastNameFld")
        let $roleFld = $("#roleFld")
    }

    $(main);
})

()