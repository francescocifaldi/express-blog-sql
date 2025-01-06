const posts = require('../data/posts.js')
const connection = require('../data/db.js')

function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM posts';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);
    })
}

function show(req, res){
    const { id } = req.params
    console.log(id)

    const sql = `SELECT * FROM posts WHERE id = ?`
    const sqlTags = ' SELECT tags.* FROM tags JOIN post_tag ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({error: 'Post not found'})
        const post = results[0]
        connection.query(sqlTags,[id],(err,tags) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            post.tags=tags
            res.json(post)
        })
    })
}


function store(req, res){
    const newId = posts.length +1
    console.log(req.body)
    const {title, slug, content, image, tag} = req.body
    
    let lastIndex = posts.length
    const newPost = {id: newId, title, slug, content, image, tag}
    posts.push(newPost)
    console.log(posts)
    res.send(newPost)
}

function update(req, res){
    res.send(`Aggiorno il post con id: ${req.params.id}`)
}

function modify(req, res){
    res.send(`Modifico il post con id: ${req.params.id}`)
}

function destroy(req, res){
    const { id } = req.params
    console.log(id)
    const sql = `DELETE FROM posts WHERE id = ?`
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' })
        res.sendStatus(204)
        })
}

module.exports = {index, show, store, update,modify,destroy}