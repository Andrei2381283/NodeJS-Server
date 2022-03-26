links={
	roles:{},
	temp:{},
	scan(){
		let a=document.querySelectorAll('div[data-set]');
		let b;
		let c;
		let d;
		links.roles={};
		//console.log(a.length);
		for(let i=0; i<a.length; i++){
			//console.log(typeof(a[i]));
			b=a[i].querySelectorAll('input');
			c=a[i].dataset.set;
			//console.log('block   -   '+c);
			links.roles[c]={};
			let dd;
			let dd1;
			for(let j=0; j<b.length; j++){
				dd1=b[j].parentNode;
				dd=dd1.childNodes[1];
				d=dd.innerText;
				//console.log(d);
				links.roles[c][d]=b[j];
			}
		}
	},
	felds_read(){
		abonent.felds={};
		for(let i in links.roles){
			//console.log(i);
			abonent.felds[i]={};
			for(let j in links.roles[i]){
				//console.log(j);
				abonent.felds[i][j]=links.roles[i][j].value;
			}
		}
	},
	felds_write(){
		for(let i in links.roles){
			for(let j in links.roles[i]){
				abonent.felds[i][j]=links.roles[i][j].value=abonent.felds[i][j];
			}
		}
	}
};
let comm={
	
	ax(obj){//стандартная функция отправки сообщения
	    let url;
	    if(links.blk_name=='owner'&&links.cmd_name!='new_passkey'){
		    url="../";
	    }else{
		    url="../"+links.roles.owner.domain.value+"/";	        
	    }
		let req=new XMLHttpRequest();
		req.addEventListener('load', comm.show_ax);//привязали контекст
		req.open('POST', url, true);
		req.responseType = 'text';
		links.blk_answer.innerHTML='';
		req.send(obj);
	},
	
    show_ax(e) {//стандартная функция получения сообщения
        let data=e.target;
        if(data.status==200){
            let obj=JSON.parse(data.response);
            for(let i in obj){
                //links.blk_answer.innerHTML= links.blk_answer.innerHTML+"<spsn>"+ i; 
                let blk_line=document.createElement('div');
                blk_line.innerText=i+":  "+obj[i];
                links.blk_answer.append(blk_line);
            }
            //links.blk_answer.innerText= data.response;
		}
        if(data.status>399){

		}
    }

};
control={
	start(){
		links.scan();
		if(localStorage.abonent){
			abonent=JSON.parse(localStorage.abonent);
			links.felds_write();
		}
	},
	btn(e){
		let btn=e.target.parentNode;
		if(btn.dataset.set&&e.target.className=='btn'){
			console.log(btn.dataset.set);
			links.felds_read();
			localStorage.abonent=JSON.stringify(abonent);
			let b=btn.querySelector('select').value;
			let date={};
			date.type=b;
			console.log(b);	
			let felds=arrs.commands[b].out;		
			for(let i in felds){
				date[felds[i]]=abonent.felds[btn.dataset.set][felds[i]];
			}
			links.blk_name=btn.dataset.set;
			links.cmd_name=b;
			let z=btn.querySelector('.answer');
			links.blk_answer=z;
			console.log(JSON.stringify(date));
			console.log(JSON.stringify(arrs.commands[b].in));
			comm.ax(JSON.stringify(date));
		}
	}
};
arrs={
	commands:{
		new_owner:{out:['login','password','name'], in:['key','session']},
		recovery_owner:{out:['login','password'], in:['key','session']},
		in_owner:{out:['key','session'], in:['key','session']},
		new_pass:{out:['login','password','name','login_new','password_new','name_new'], in:['key','session']},
		check_domain:{out:['login','password','domain'], in:['domain']},
		take_domain:{out:['login','password','domain', 'company_name'], in:[]},
		new_passkey:{out:['login','password','role','name_staff'], in:['role','name_staff','passkey']},	
		new_user:{out:['login','password','name'], in:['color','color_txt', 'code']},
		recovery:{out:['login','password'], in:['color','color_txt', 'code']},
		in_user:{out:['key','session'], in:['color','color_txt', 'code']},
		read:{out:['key','session'], in:['key','perk', 'in']},		
		check:{out:['login','password'], in:['key','color','color_txt', 'code']},
		bill:{out:['login','password'], in:['key','perk','bill']},
		out:{out:['login','password'], in:['key','color','color_txt', 'code']},
		new_staff:{out:['login','password','name','passkey'], in:['key','session','role']},
		recovery_staff:{out:['login','password'], in:['key','session','role']},
		in_staff:{out:['key','session'], in:['key','session','role']},
		out_staff:{out:['key','session'], in:['key']},		
		new_pass_staff:{out:['login','password','name','login_new','password_new','name_new'], in:['key','session']},
		read_staff:{out:['key','session'], in:['key',"[{},{},{}]"]},
		ok:{out:['key','session','key_user', 'action'], in:['key','key_user','perk','name_user']},		
		no_ok:{out:['key','session','key_user', 'action'], in:['key','key_user']},		
		perk:{out:['key','session','key_user', 'perk'], in:['key','key_user','perk','name_user']},	
		balance:{out:['key','session'], in:['key','count','balance_old','cost', 'limit']},	
		read_msgs:{out:['key','session'], in:['key',"[{},{},{}]"]},	
		write_msg:{out:['key','session', 'to', 'title', 'message'], in:['key','msg_num']},
		//this date on server = now
		cost_read:{out:['key','session', 'date'], in:['key',"[{},{},{}]"]},		
        cost_dell:{out:['key','session', 'date'], in:['key','date']},
        cost_add:{out:['key','session', 'date', 'cost_obj'], in:['key','date']},
        log_read:{out:['key','session', 'date'], in:['key',"[{},{},{}]"]},
        user_list_read:{out:['key','session', 'number'], in:['key',"[{},{},{}]"]},
        user_dell:{out:['key','session', 'key_user'], in:['key', 'key_user']},
        user_dell_all:{out:['key','session'], in:['key']},        
        staff_list_read:{out:['key','session', 'number'], in:['key',"[{},{},{}]"]},
        staff_dell:{out:['key','session', 'key_staff'], in:['key', 'key_staff']},
        staff_dell_all:{out:['key','session'], in:['key']},
        list_in:{out:['key','session'], in:['key',"[{},{},{}]"]},        
        role_list_read:{out:['key','session'], in:['key',"[{},{},{}]"]},
        role_write:{out:['key','session', 'role_name', 'role_obj'], in:['key','role_name']},        
        settings_calc_read:{out:['key','session'], in:['key',"[{},{},{}]"]},
        settings_calc_edit:{out:['key','session', 'settings_obj'], in:['key']}, 
        read_file:{out:['key','session', 'name_file'], in:['key','name_file','txt_file']},
        write_file:{out:['key','session', 'name_file','txt_file'], in:['key','name_file']},        
	}
};
abonent={
	felds:{}
};

let b=document.querySelector('.all');
b.addEventListener( "click" , control.btn);

control.start();