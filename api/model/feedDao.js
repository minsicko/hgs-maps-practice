import { DataTypes } from 'sequelize'
import sequelize from './dataSource'

const posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    view: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }
}, 
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    }
)

export default {
    get_all_posts : async() => {
        const result = await posts.findAndCountAll()
        
        if (result.count == 0) throw new Error('get_all_posts_error')           // 게시글이 1개도 없으면 에러 반환

        return result.rows
    },

    add_post : async(title, content) => {
        await posts.create({ title: title, content: content })                  // 게시글 추가
        return posts.findAll()                                                  // 추가 이후 전체 게시글 반환
    },

    update_post_content : async(post_id, content) => {
        const isExist = await posts.findByPk(post_id)
        
        if (!!isExist == false) throw new Error('update_post_content_error')    // 게시글 아이디 없으면 에러 반환

        await posts.update(                                                     // 게시글 컨텐츠 수정
            { content: content },
            { where: { id: post_id }}
        )
        return posts.findAll({                                                  // 수정 후 게시글 반환
            where: { id: post_id }
        })
    },

    delete_post : async(post_id) => {
        const result = await posts.destroy({
            where: { id: post_id }
        })

        if (result !== 0 && result !== 1) throw new Error('delete_post_error')  // 게시글 삭제 수가 0 아님 1이 아닐 경우 에러 반화
        
        return result
    }
}