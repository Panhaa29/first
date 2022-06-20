$(Document).ready(function(){
    var tbl = $('#tbldata');
    var viewImgBox = "<div class='view-img-box'>"+
                        "<div class='btn-close-img-box'>X</div>"+
                        "<img src='img/1.jpg'>"+
                    "</div>";

    // Delete Data
    $('body').on('click','#tbldata .btn-del', function(){
        var tr = $(this).parents('tr');
        var id = tr.find('td:eq(0)').text();
        var img = tr.find('td:eq(3) img').attr('alt');
        var loading = "<div class='popup'><div class='del-loading'></div></div>";
        // alert(img);
        $.ajax({
            url:'action/delete.php',
            type:'POST',
            data:{"id":id,"img":img},// bos Data tv (Delete.php)
            //contentType:false,
            cache:false,
            //processData:false,
            dataType:"json",
            beforeSend:function(){
                $('body').append(loading);

            },
            success:function(data){ 
                if(data.status==true){
                    tr.remove();
                    
                }else{
                    alert('TRY AGAIN.')
                }
                $('.popup').remove();
                

                
            
            
               
            }        
        });
    });
    
    // view img

    tbl.on('click','tr td img',function(){
        var myImg = $(this).attr('src');
        //alert(myImg);
        $('body').append(viewImgBox);
        $('body').find(".view-img-box img").attr("src",myImg);
    });

    $('body').on('click','.btn-close-img-box',function(){
        $(this).parent().remove();
    });
    //Upload IMG
    
    $('.txt-file').change(function(){
        var eThis = $(this); 
        var imgbox = eThis.parent();
        var loading = "<div class='img-loading'></div>";
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/upl-img.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){

                imgbox.append(loading);

            },
            success:function(data){ 
                imgbox.css({"background-image":"url('img/"+data.img+"')"});
                imgbox.find('.img-loading').remove();
                $('#txt-photo').val(data.img);

                
            
            
               
            }        
        });
    });


    
    var ind;
    $('#btn-save-menu').click(function(){
        var eThis = $(this);
        var parent = eThis.parents('.frm');
        var id = parent.find('#txt-id');
        var name = parent.find('#txt-name');
        var photo = parent.find('#txt-photo');
        var des = parent.find('#txt-des');
        
        
        var imgbox = parent.find('.img-box');
        var btnAction= " <a class='btn-edit'><i class='fas fa-edit'></i></a> <a class='btn-del'><i class='fas fa-trash'></i></a>";
        var status = parent.find('#txt-status');
        var od = parent.find('#txt-od');

        if(name.val()==''){
            alert('Please Input Name');
            name.focus();
            return;
        }else if(des.val()==''){
            alert('Please Input Description');
            des.focus();
            return;
        }
        // else if( $.isNumeric(price.val()== false) ){     // to check number only but set in ajax already!!!!!!!!
        //     alert('Number Only.');
        //     price.val('');
        //     price.focus();
        //     return;

        // }


        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/save-menu.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){
                eThis.html("Wait...");
                eThis.css({"pointer-events":"none"});
            },
            success:function(data){ 
                
                if(data.dpl== true){
                    alert('Duplicate Name.');
                    name.val('');
                    name.focus();
                    eThis.html("Save Changes");
                    eThis.css({"pointer-events":"auto"});
                    return;
                }
                if(data.error == true){
                    alert('Data Error');
                    des.val('');
                    des.focus();
                }else{
                    if(data.edit== true){
                        tbl.find('tr:eq('+ind+') td:eq(1)').text(name.val());
                        tbl.find('tr:eq('+ind+') td:eq(2) img').attr("src","img/"+photo.val());
                        tbl.find('tr:eq('+ind+') td:eq(2) img').attr("alt",photo.val());
                        tbl.find('tr:eq('+ind+') td:eq(3)').text(des.val());
                        tbl.find('tr:eq('+ind+') td:eq(4)').text(od.val());
                        tbl.find('tr:eq('+ind+') td:eq(5)').text(status.val());
                        
                        tbl.find('tr:eq('+ind+') td').css({"background-color":"yellowgreen"});
                        id.val(data.id);
                        od.val(data.id);


                    }else{
                            var tr = "<tr>"+
                            "<td>"+(data.id-1)+"</td>"+
                            " <td>"+name.val()+"</td> "+
                            "<td><img src='img/"+photo.val()+"' alt='"+photo.val()+"'></td>"+
                            "<td>"+des.val()+"</td>"+
                            "<td>"+od.val()+"</td>"+
                            
                            "<td>"+status.val()+"</td>"+
                            "<td>"+btnAction+"</td>"+
                            "</tr>";
                            // tbl.append(tr);
                            tbl.find('tr:eq(0)').after(tr);
                            id.val(data.id);
                            od.val(data.id);
                        }
                    
                    name.val('');
                    des.val('');
                    name.focus();
                    $('#txt-edit-id').val(0);
                    imgbox.css({"background-image":"url('pf.jpg')"});
                    $('.txt-file').val('');
                    $('#txt-photo').val('');
            
                }    
                

                eThis.html("Save Changes");
                eThis.css({"pointer-events":"auto"});
               
            }        
        });
    });

    //Edit Data


    $('#tbldata').on("click","tr td .btn-edit", function(){
        var eThis = $(this);
        var tr = eThis.parents('tr');
        var id = tr.find("td:eq(0)").text().trim();
        var name = tr.find("td:eq(1)").text().trim();
        var des = tr.find("td:eq(3)").text().trim();
        var img = tr.find("td:eq(2) img").attr("alt");
        var od = tr.find("td:eq(4)").text().trim();
        var status = tr.find("td:eq(5)").text().trim();
        
        $('#txt-id').val(id);
        $('#txt-name').val(name);
        $('#txt-des').val(des);
        $('#txt-edit-id').val(id);
        $('.img-box').css({"background-image":"url(img/"+img+")"});
        $('#txt-photo').val(img);
        $('#txt-status').val(status);
        $('#txt-od').val(od);
        ind = tr.index();
    });

    //Save Content
    $('#btn-save-content').click(function(){
        
        var eThis = $(this);
        var parent = eThis.parents('.frm');
        var id = parent.find('#txt-id');
        var name = parent.find('#txt-name');
        var photo = parent.find('#txt-photo');
        var des = parent.find('#txt-des');
        var menu= parent.find('#txt-menu');
        
        
        var imgbox = parent.find('.img-box');
        var btnAction= " <a class='btn-edit' id='btn-edit-ct'><i class='fas fa-edit'></i></a> ";
        var status = parent.find('#txt-status');
        var od = parent.find('#txt-od');
        var menuName=  parent.find('#txt-menu option:selected').text(); 

        if(name.val()==''){
            alert('Please Input Name');
            name.focus();
            return;
        }else if(des.val()==''){
            alert('Please Input Description');
            des.focus();
            return;
        }else if(menu.val()==0){
            alert("Please Select Menu...!");
            return;
        }
        // else if( $.isNumeric(price.val()== false) ){     // to check number only but set in ajax already!!!!!!!!
        //     alert('Number Only.');
        //     price.val('');
        //     price.focus();
        //     return;

        // }


        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/save-content.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){
                eThis.html("Wait...");
                eThis.css({"pointer-events":"none"});
            },
            success:function(data){ 
                
                if(data.dpl== true){
                    alert('Duplicate Name.');
                    name.val('');
                    name.focus();
                    eThis.html("Save Changes");
                    eThis.css({"pointer-events":"auto"});
                    return;
                }
                if(data.error == true){
                    alert('Data Error');
                    des.val('');
                    des.focus();
                }else{
                    if(data.edit== true){
                        tbl.find('tr:eq('+ind+') td:eq(1)').html("<span style='display:none;'>"+menu.val()+"</span>"+menuName);
                        tbl.find('tr:eq('+ind+') td:eq(2)').text(name.val());
                        tbl.find('tr:eq('+ind+') td:eq(3) img').attr("src","img/"+photo.val());
                        tbl.find('tr:eq('+ind+') td:eq(3) img').attr("alt",photo.val());
                        tbl.find('tr:eq('+ind+') td:eq(4)').text(des.val());
                        tbl.find('tr:eq('+ind+') td:eq(5)').text(od.val());
                        tbl.find('tr:eq('+ind+') td:eq(6)').text(status.val());
                        
                        tbl.find('tr:eq('+ind+') td').css({"background-color":"yellowgreen"});
                        id.val(data.id);
                        od.val(data.id);


                    }else{
                            var tr = "<tr>"+
                            "<td>"+(data.id-1)+"</td>"+
                            " <td><span style='display:none;'>"+menu.val()+"</span>"+menuName+"</td> "+
                            " <td>"+name.val()+"</td> "+
                            "<td><img src='img/"+photo.val()+"' alt='"+photo.val()+"'></td>"+
                            "<td>"+des.val()+"</td>"+
                            "<td>"+od.val()+"</td>"+
                            
                            "<td>"+status.val()+"</td>"+
                            "<td>"+btnAction+"</td>"+
                            "</tr>";
                            // tbl.append(tr);
                            tbl.find('tr:eq(0)').after(tr);
                            id.val(data.id);
                            od.val(data.id);
                        }
                    
                    name.val('');
                    des.val('');
                    name.focus();
                    $('#txt-edit-id').val(0);
                    imgbox.css({"background-image":"url('pf.jpg')"});
                    $('.txt-file').val('');
                    $('#txt-photo').val('');
            
                }    
                

                eThis.html("Save Changes");
                eThis.css({"pointer-events":"auto"});
               
            }        
        });
    });

    //Edit Content
    $('#tbldata').on("click","tr td #btn-edit-ct", function(){
        var eThis = $(this);
        var tr = eThis.parents('tr');
        var id = tr.find("td:eq(0)").text().trim();
        var menu = tr.find("td:eq(1) span").text().trim();
        var name = tr.find("td:eq(2)").text().trim();
        var img = tr.find("td:eq(3) img").attr("alt");
        var des = tr.find("td:eq(4)").text().trim();  
        var od = tr.find("td:eq(5)").text().trim();
        var status = tr.find("td:eq(6)").text().trim();
        
        $('#txt-id').val(id);
        $('#txt-menu').val(menu);
        $('#txt-name').val(name);
        $('#txt-des').val(des);
        $('#txt-edit-id').val(id);
        $('.img-box').css({"background-image":"url(img/"+img+")"});
        $('#txt-photo').val(img);
        $('#txt-status').val(status);
        $('#txt-od').val(od);
        ind = tr.index();
    });
});