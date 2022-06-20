<div class="row">
                <?php
                        $sql = "SELECT * FROM tbl_content WHERE menu_id =$menu ORDER BY od"; 
                        $res = $cn->query($sql);
                        $num = $res->num_rows;
                        if( $num>0 ){
                            while( $row= $res->fetch_array() ){
                                ?>
                                    <div class="col-xl-3 col-lg-3 item">
                                        <div class="box">
                    
                                        <div class="img-box" style="background-image: url('../admin/img/<?php echo $row[2] ?>');">
                        
                                        </div>
                                        <div class="txt-box">
                                            <h1 style="font-size: 15px;"><?php echo $row[1] ?></h1>
                                            <p style="font-size: 13px;" >
                                                <?php echo substr($row[3],0,160); ?>...
                                            </p>
                                        </div>
                                            <a href="index.php?menu=<?php echo $row[4];?>&cid=<?php echo $row[0]; ?>">More...</a>
                                        </div>
                                    </div>
                                <?php
                            }
                        }
                ?>                
        </div>