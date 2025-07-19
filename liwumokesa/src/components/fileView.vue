<template>
    <div>
        <div v-if="file_type == 'application/pdf'">
            <q-btn @click="downloadFile" size="sm" color="primary" icon="file_download" label="Download" />
            <hr class="hrpagin">
            <pdfViewKu :pdfFile="$store.state.url.URL_APP+'uploads/'+fileOld"/>
        </div>
        <div v-if="file_type == 'image/jpg' || file_type == 'image/jpeg' || file_type == 'image/png'">
            <q-btn @click="downloadFile" size="sm" color="primary" icon="file_download" label="Download" />
            <hr class="hrpagin">
            <q-img
                :src="$store.state.url.URL_APP+'uploads/'+fileOld"
                spinner-color="primary"
                spinner-size="82px"
            />
        </div>
        <div v-if="file_type == 'video/mp4' || file_type == 'video/webm' || file_type == 'video/mpeg' || file_type == 'video/quicktime' || file_type == 'video/H264'">
            <q-btn @click="downloadFile" size="sm" color="primary" icon="file_download" label="Download" />
            <hr class="hrpagin">
            <video width="100%" height="100%" controls>
                <source :src="$store.state.url.URL_APP+'uploads/'+fileOld" type="video/mp4">
                <source :src="$store.state.url.URL_APP+'uploads/'+fileOld" type="video/webm">
                <source :src="$store.state.url.URL_APP+'uploads/'+fileOld" type="video/mpeg">
                <source :src="$store.state.url.URL_APP+'uploads/'+fileOld" type="video/quicktime">
                <source :src="$store.state.url.URL_APP+'uploads/'+fileOld" type="video/H264">
                <source :src="$store.state.url.URL_APP+'uploads/'+fileOld" type="video/ogg">
                Your browser does not support the video tag.
            </video>
        </div>

        <div v-if="file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'">
            <q-btn @click="downloadFile" size="sm" color="primary" icon="file_download" label="Download" />
            <hr class="hrpagin">
                          <!-- <iframe style="width: 100%; height: 900px;" src="http://docs.google.com/gview?url=https://calibre-ebook.com/downloads/demos/demo.docx&embedded=true" height="240" width="320" frameborder="0"></iframe> -->
            <!-- <iframe :src='"https://view.officeapps.live.com/op/embed.aspx?src=https://calibre-ebook.com/downloads/demos/demo.docx"' width='100%' height='650px' frameborder='0'></iframe> -->
            <iframe :src='"https://view.officeapps.live.com/op/embed.aspx?src="+$store.state.url.URL_APP+"uploads/"+fileOld' width='100%' height='650px' frameborder='0'></iframe>
        </div>

        <div v-if="file_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'">
            <q-btn @click="downloadFile" size="sm" color="primary" icon="file_download" label="Download" />
                          <hr class="hrpagin">
            <!-- <iframe style="z-index:9999" src='https://view.officeapps.live.com/op/embed.aspx?src=https://jyoti.co.in/wp-content/uploads/2015/03/sample.xlsx' width='100%' height='650px' frameborder='0'></iframe> -->
            <iframe style="z-index:9999" :src='"https://view.officeapps.live.com/op/embed.aspx?src="+$store.state.url.URL_APP+"uploads/"+fileOld' width='100%' height='650px' frameborder='0'></iframe>
        </div>

    </div>
</template>

<script>
export default {
    props: ["fileOld", "file_type"],
    methods: {
        downloadFile() {
            window.open(
                this.$store.state.url.URL_APP+'uploads/'+this.fileOld,
            '_blank' // <- This is what makes it open in a new window.
            );
        }
    },
}
</script>

<style lang="scss" scoped>

</style>