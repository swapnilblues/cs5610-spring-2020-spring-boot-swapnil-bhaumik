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

    let $h1 = jQuery("h1")
    $h1.html("ABC")
        .css("color", "red")

    let $student = $("<h1>Students</h1>")
    let $body = $("body")
    $body.append($student)
    let $userList = $("#userList")
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
        for (let u in users) {
            let $userLi = $(`<li> ${users[u].username} </li>`)

            let $deleteBtn = $("<button>Delete</button>")
            $deleteBtn.click(() => deleteUser(u)
            )

            let $editBtn = $("<button>Edit</button>")
            $editBtn.click(() => editUser(u)
            )
            $userLi.append($deleteBtn)
            $userLi.append($editBtn)
            $userList.append($userLi)
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
            username : $usernameFld.val()
        }
        $usernameFld.val("")
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


    let $createUserBtn = $("#createUser")
    let $updateUserBtn = $("#updateUser")
    $createUserBtn.click(createUser)
    $updateUserBtn.click(updateUser)

    let $usernameFld = $("#usernameFld")
})

()