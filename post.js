
  const client = new dhive.Client(["https://api.hive.blog", "https://api.hivekings.com", "https://anyx.io", "https://api.openhive.network"]);
  //const hiveJs = hivejs.api.setOptions({ url: 'https://api.hive.blog' });
  function fetchBlog() {
    const query = {
        tag: 'airhawk-project',
        limit: 10,
    };
  client.database.getDiscussions("blog", query)
   
    .then(discussions=> {
        var posts= [];
        discussions.forEach(post => {
            const json = JSON.parse(post.json_metadata);
                const image = json.image ? json.image[0] : '';
                const title = post.title;
                const author = post.author;
                const content =  post.body;
                const voting_power = post.voting_power ;
                const balance = post.balance ;
               
                
                //get tags and convert to array list
    			const tags = json.tags ? json.tags[0]: '';
   				// const taglist = tags.split(' ');
   				 //make simple json metadata including only tags
   			 //const json_metadata = JSON.stringify({ tags: taglist })
                
                const created = new Date(post.created).toDateString();
                posts.push(
                    `<div class="container">
                        <div class="row">
                        <div class="col-md-4">&nbsp;&nbsp;</div>
                            <div class="col-md-12">
                             <div class="card bg-light text-dark text-center">
                    <h4 class="text-center list-group-item-heading"><b>${title}</b></h4>
                    <div class="text-left"><b>Author: ${author} | Date: ${created}</b></div>
                    <div class="img-responsive"><img src="${image}" class="img-responsive" style="max-width: 400px; max-height:350px"/></div>
                    <div class="text-center" style="margin-left:20px;margin-right:20px;margin-top:20px;margin-bottom:20px"><pre>${content}</pre></div>

                    <div class="col-md-6">Tags: ${tags} </div>
                 

                    <div class="col-md-6">
                    Upvotes: <i class="fa fa-globe" aria-hidden="true"></i>| Downvotes: <i class="fa fa-heart-broken" id="like"></i> | Comments: <i class="fa fa-comment" id="like"></i> </p>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>`
                );
            
        });

        document.getElementById('postList').innerHTML = posts.join('');
        })
        .catch(err => {
            alert('Error occured' + err);
        });

    }

    function getFeeds(){
        let opts = {};

//connect to production server
opts.addressPrefix = 'STM';
opts.chainId =
    'beeab0de00000000000000000000000000000000000000000000000000000000';
//connect to server which is connected to the network/production
//const client = new dhive.Client('https://api.hive.blog');

//fetch list of trending posts
async function main() {
    const query = {
        tag: 'airhawk-project',
        limit: 20,
        truncate_body: 1,
    };
    client.database
        .getDiscussions('blog', query)
        .then(result => {
            var posts = [];
            result.forEach(post => {
                console.log('post', post);
                const json = JSON.parse(post.json_metadata);
                const image = json.image ? json.image[0] : '';
                const title = post.title;
                const author = post.author;
                const category = post.category;
                const permlink = post.permlink;
                const tags = json.tags ? json.tags[0] : '';

                // To calculate the time difference of two dates
                var datenow = new Date();
                var datecreated = new Date(post.created);
                var Difference_In_Time =  datenow.getTime() - datecreated.getTime();
                  
                // To calculate the no. of days between two dates
                var Difference_In_Days_created = Difference_In_Time / (1000 * 3600 * 24);
                var Difference_In_Years_created =  datecreated.getFullYear();
                const y = Math.round(Difference_In_Years_created);
                const created = Math.round( Difference_In_Days_created);
             
                const author_rewards = post.curator_payout_value;
                const author_reputation = post.author_reputation;
             
               const repu = author_reputation;
               const pending_payout_value = post.pending_payout_value;
                const active_votes = post.active_votes;
                let mlength =  active_votes.length;
                //Replies and comment count
                const replies = post.replies;
                let mreplies =  replies.length;
               

                // Date function
                
                var date1 = new Date();
                var date2 = new Date(post.cashout_time);
                  
                // To calculate the time difference of two dates
                var Difference_In_Time = date2.getTime() - date1.getTime();
                  
                // To calculate the no. of days between two dates
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                const cashout_time = Math.round(Difference_In_Days);
           
               
                posts.push(   
                    `<div class="container">
                    <div class="row">
                    <div class="col-md-4">&nbsp;&nbsp;</div>
                        <div class="col-md-12">
                         <div class="card bg-light text-dark">
                         <div class="card-header text-center">
                    <h5 onclick=openPost2("${author}","${permlink}") class="list-group-item-heading text-info"><b>${title}</b></h5><h5>@:<b> ${author} <span class="badge badge-info" style=" padding-left:24px;background-color:green; ">(${repLog10(repu)}) </span> </b>
                    <span class="text-light pull-right badge badge-success" style="background-color:blue;padding-left:24px"><b>Category: </b> ${category}</h5>
                    </div>
                    <div class="img-responsive text-center" style="padding-top:24px">
                    <img onclick=openPost2("${author}","${permlink}") src="${image}" class="img-thumbnail" style="max-width: 300px"/>
                    
                    </div>
                    <div  class="text-center pull-left list-group-item-text  text-nowrap"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                  </svg> wrote in : ${y} - ${created} Day(s) ago </div>
                    <div class="card-footer text-muted">
                    <div class=" text-center pull-left">
                        <span  onclick=openPost("${author}","${permlink}") id="upvote"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg> Upvote: ${mlength} </span>  
                      <span id="downvote"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                      <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
                    </svg> Downvote:0 </span> 
                    <span id="comments" onclick=openPost0("${author}","${permlink}");><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                  </svg> Comments: ${mreplies} </span>
                        <button type="button" class="text-info pull-right badge badge-danger" data-toggle="tooltip" data-placement="top" title="
                    
                        ${pending_payout_value} to be claimed on ${cashout_time} days ">
                        ${author_rewards}
                      </button>
                        </div>
                        <div class="text-center text-danger"><b>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
</svg>${author_rewards}
                        </b></div>
             
                     </div>
                    </div>
                    </div>
                    </div>
                    </div>`
                );
            });
            document.getElementById('postList').style.display = 'block';
            document.getElementById('postList').innerHTML = posts.join('');
        })
        .catch(err => {
            console.log(err);
            alert('Error occured, please reload the page');
        });

        function log10(str) {
            const leadingDigits = parseInt(str.substring(0, 4));
            const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
            const n = str.length - 1;
            return n + (log - parseInt(log));
        }
        
         const repLog10 = rep2 => {
            if (rep2 == null) return rep2;
            let rep = String(rep2);
            const neg = rep.charAt(0) === '-';
            rep = neg ? rep.substring(1) : rep;
        
            let out = log10(rep);
            if (isNaN(out)) out = 0;
            out = Math.max(out - 9, 0); // @ -9, $0.50 earned is approx magnitude 1
            out = (neg ? -1 : 1) * out;
            out = out * 9 + 25; // 9 points per magnitude. center at 25
            // base-line 0 to darken and < 0 to auto hide (grep rephide)
            out = parseInt(out);
            return out;
        };
}
//catch error messages
main().catch(console.error);

//get_content of the post
window.openPost = async (author, permlink) => {
    client.database
        .call('get_active_votes', [author, permlink])
        .then(result => {
           
            console.log('votes', result, JSON.stringify(result));
            
            var voters = [];
            voters.push(
                `<div class="card text-light" style="width: 18rem;">
               
                <button class="btn btn-sm btn-danger" onclick=goback()>Close</button>
               
                </div>
                
                <br>`
            );
            result.forEach(voter => {
                const name = voter.voter;
                const time = new Date(voter.time).toDateString();
                const wei = voter.percent /100;
                const rshares = voter.rshares;
                voters.push(`
                <div class="card list-group text-danger">
  <p class="list-group-item">
  @: ${name} 
  Time: (${time}) 
  Vote: ${wei}% 
Shares: ${repLog10(rshares)}
  </p>
             
                </div>
               
                `);
            });

            document.getElementById('postList').style.display = 'none';
            document.getElementById('postBody').style.display = 'block';
            document.getElementById('postBody').innerHTML = voters.join('<li>');

           // document.getElementById('upvote').innerHTML = voters.join('<p>');
        });
};
//go back from post view to list
window.goback = async () => {
    document.getElementById('postList').style.display = 'block';
    document.getElementById('postBody').style.display = 'none';
};


//get_content of the post
window.openPost2 = async (author, permlink) => {
    client.database.call('get_content', [author, permlink]).then(result => {
       // const md = new Remarkable({ html: true, linkify: true });
        //const body = md.render(result.body);
        const body = result.body;
        const content = `<div class='pull-right'>
        <button class="btn btn-sm btn-danger" onclick=goback()>Close</button></div><br><h2 class="text-info">${
            result.title
        }</h2><br>
        <div class="row">
        <div class="card">
        <div class="card-body text-dark">
        ${body}
        </div>
        </div>
        </div>
       <br>`;

        document.getElementById('postList').style.display = 'none';
        document.getElementById('postBody').style.display = 'block';
        document.getElementById('postBody').innerHTML = content;
    });
};
//go back from post view to list
window.goback2 = async () => {
    document.getElementById('postList').style.display = 'block';
    document.getElementById('postBody').style.display = 'none';
};
function log10(str) {
    const leadingDigits = parseInt(str.substring(0, 4));
    const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
    const n = str.length - 1;
    return n + (log - parseInt(log));
}

 const repLog10 = rep2 => {
    if (rep2 == null) return rep2;
    let rep = String(rep2);
    const neg = rep.charAt(0) === '-';
    rep = neg ? rep.substring(1) : rep;

    let out = log10(rep);
    if (isNaN(out)) out = 0;
    out = Math.max(out - 9, 0); // @ -9, $0.50 earned is approx magnitude 1
    out = (neg ? -1 : 1) * out;
    out = out * 9 + 25; // 9 points per magnitude. center at 25
    // base-line 0 to darken and < 0 to auto hide (grep rephide)
    out = parseInt(out);
    return out;
};

        
    }


   
        //get_comment of the post
window.openPost0 = async(author, permlink)=> {
    client.database.call('get_content_replies', [author, permlink]).then(result => {
        const comments = [];
        for (var i = 0; i < result.length; i++) {
            comments.push(
                `<div class="list-group-item list-group-item-action flex-column align-items-start">\
                <div class="d-flex w-100 justify-content-between">\
                  <h5 class="mb-1">@${result[i].author}</h5>\
                  <small class="text-muted">${new Date(
                      result[i].created
                  ).toString()}</small>\
                </div>\
                <p class="mb-1"><pre>${result[i].body}</pre></p>\
                <small class="text-muted">&#9650; ${result[i].net_votes}</small>\
              </div>`
            );
           // const comments = result[i].length();
        }
        document.getElementById('postBody').style.display = 'none';
        document.getElementById('postComments').style.display = 'block';
        document.getElementById('postComments').innerHTML = comments.join('');
    });
    //go back from post view to list
window.goback0 = async () => {
    document.getElementById('postList').style.display = 'block';
    document.getElementById('postBody').style.display = 'none';
};
}
        
        


   

   
   
    


    
    //fetchBlog();
    //getPostDetails()
   //filterPost();
    getFeeds();
