<div class="row">
    <?php
        $sql = "SELECT * FROM tbl_content WHERE id =$cid "; 
        $res = $cn->query($sql);
        $row = $res->fetch_array();               
    ?>
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <img style="width:100%; " src="../admin/img/<?php echo $row[2] ?>" alt="">
            <p> <?php echo $row[3] ?> </p>
        </div>
    </div>                
</div>